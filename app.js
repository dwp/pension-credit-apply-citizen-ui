const { configure, middleware } = require('@dwp/govuk-casa');
const express = require('express');
const path = require('path');
const packageMeta = require('./package.json');
const { prepareLogging, prepareRedisListener, prepareCryptoService } = require('./bootstrap/index.js');
const { waypoints } = require('./lib/constants.js');
const prometheusClient = require('./lib/prometheus-client.js');
const ApiHelperFactory = require('./lib/ApiHelperFactory.js');
const AddressServiceFactory = require('./lib/AddressServiceFactory.js');
const ClaimServiceFactory = require('./lib/ClaimServiceFactory.js');
const getSessionConfig = require('./lib/get-session-config.js');
const mediaMiddleware = require('./middleware/media.js');
const nonceMiddleware = require('./middleware/nonce.js');
const idBarMiddleware = require('./middleware/id-bar.js');
const actuator = require('./routes/actuator/index.js');
const viewFilterPush = require('./view-filters/push.js');
const viewFilterSetAtrtribute = require('./view-filters/set-attribute.js');
const viewFilterFormatMoney = require('./utils/format-money.js');
const viewFilterFormatNino = require('./utils/format-nino.js');
const pageDefinitions = require('./definitions/pages.js');
const journeyPlan = require('./definitions/journey.js');
const checkYourAnswersGet = require('./routes/submission/check-your-answers.get.js');
const checkYourAnswersPost = require('./routes/submission/check-your-answers.post.js');
const whatHappensNextGet = require('./routes/submission/what-happens-next.get.js');

module.exports = (CONFIG, baseLogger) => {
  baseLogger.info(`CACHAIN has ${!CONFIG.CACHAIN ? 'not ' : ''}been found`);

  // Set up Express to use base logger for all requests
  const app = express();
  prepareLogging(
    app,
    baseLogger,
    CONFIG.TRACE_REQUEST_HEADER_NAME,
    CONFIG.SESSION_COOKIE_NAME,
  );

  // Setup Redis cluster listener in order to handler the session store lifecycle
  // properly. We'll present a 500 page to all users if Redis is not contactable.
  // ref: https://github.com/luin/ioredis#events
  const redisClusterListener = prepareRedisListener(baseLogger, process.exit);

  // Prepare cryptoservice
  const cryptoService = prepareCryptoService({
    logger: baseLogger,
    mode: CONFIG.REDIS_ENCRYPTION_MODE,
    keyAlias: CONFIG.REDIS_ENCRYPTION_ALIAS,
    awsEndpointUrl: CONFIG.AWS_KMS_ENDPOINT,
  });

  // Prepare location service client
  baseLogger.info(`Setting up AddressService client on ${CONFIG.ADDRESSSERVICE_API_ENDPOINT}`);
  const addressServiceFactory = new AddressServiceFactory(new ApiHelperFactory({
    prefixUrl: CONFIG.ADDRESSSERVICE_API_ENDPOINT,
    traceRequestHeaderName: CONFIG.OUTBOUND_TRACE_REQUEST_HEADER_NAME,
    httpTimeout: CONFIG.HTTP_TIMEOUT,
    cachain: CONFIG.CACHAIN,
  }));

  // Prepare claim service client
  baseLogger.info(`Setting up ClaimService client on ${CONFIG.CLAIMSERVICE_API_ENDPOINT}`);
  const claimServiceFactory = new ClaimServiceFactory(new ApiHelperFactory({
    prefixUrl: CONFIG.CLAIMSERVICE_API_ENDPOINT,
    traceRequestHeaderName: CONFIG.OUTBOUND_TRACE_REQUEST_HEADER_NAME,
    httpTimeout: CONFIG.HTTP_TIMEOUT,
    cachain: CONFIG.CACHAIN,
  }));

  // Load the router index controller for the 3 endpoints
  // /actuator/health
  // /actuator/info
  // /actuator/metrics
  app.use(CONFIG.CONTEXT_PATH_PROXY, actuator(packageMeta, prometheusClient));

  // Create a new CASA application instance.
  const casaApp = configure(app, {
    mountUrl: CONFIG.CONTEXT_PATH,
    proxyMountUrl: CONFIG.CONTEXT_PATH_PROXY,
    views: {
      dirs: [
        path.resolve(__dirname, 'views'),
        path.resolve(__dirname, 'dist/views'),
      ],
    },
    compiledAssetsDir: path.resolve(__dirname, 'static'),
    phase: 'live',
    serviceName: 'common:serviceName',
    sessions: getSessionConfig(
      CONFIG.SESSION_COOKIE_NAME,
      CONFIG.SESSION_TTL,
      CONFIG.USE_TLS,
      CONFIG.CACHAIN,
      CONFIG.SESSION_SECRET,
      CONFIG.REDIS_HOSTS,
      CONFIG.REDIS_CLUSTER_MODE,
      redisClusterListener,
      baseLogger,
      cryptoService,
    ),
    i18n: {
      dirs: [path.resolve(__dirname, 'locales')],
      locales: ['en'],
    },
    allowPageEdit: true,
    mountController: function casaMountController(mountCommonMiddleware) {
      // Add some custom media assets (CSS, JS) to be served from the CASA router.
      // Serve this up before CASA middleware
      mediaMiddleware(this.expressApp, CONFIG.CONTEXT_PATH_PROXY, './public/');
      mountCommonMiddleware();
      nonceMiddleware(this.expressApp, CONFIG.ENABLE_CSP);
      idBarMiddleware(this.expressApp);
    },
  });

  // Load custon nunjucks filters
  app.get('nunjucksEnv').addFilter('push', viewFilterPush);
  app.get('nunjucksEnv').addFilter('setAttribute', viewFilterSetAtrtribute);
  app.get('nunjucksEnv').addFilter('formatMoney', viewFilterFormatMoney);
  app.get('nunjucksEnv').addFilter('formatNino', viewFilterFormatNino);

  // Add Google Tag Manger ID to view
  app.get('nunjucksEnv').addGlobal('googleTagManagerId', CONFIG.GOOGLE_TAG_MANAGER_ID);

  // Index route
  casaApp.router.get('/', (req, res) => {
    // Redirect to first page in the journey
    res.status(302).redirect(`${casaApp.config.mountUrl}${waypoints.START}`);
  });

  // Prepare page hooks for "Select your address" page
  const appPageDefinitions = pageDefinitions(
    addressServiceFactory,
    casaApp.config.mountUrl,
  );
  const appUserJourney = journeyPlan(baseLogger);

  // Load CASA page and user journey definitions
  casaApp.loadDefinitions(appPageDefinitions, appUserJourney);

  // Prepare some CASA page handlers
  const casaMwPrepare = middleware.pagePrepareRequest(appUserJourney);
  const casaMwRails = middleware.pageJourneyRails(CONFIG.CONTEXT_PATH, appUserJourney);

  // Claim submission handlers
  const submissionCommonMw = [casaMwPrepare, casaMwRails, middleware.pageCsrf];
  casaApp.router.get(`/${waypoints.CHECK_YOUR_ANSWERS}`, submissionCommonMw, checkYourAnswersGet(
    appUserJourney,
  ));
  casaApp.router.post(`/${waypoints.CHECK_YOUR_ANSWERS}`, submissionCommonMw, checkYourAnswersPost(
    claimServiceFactory,
    CONFIG.HTTP_TIMEOUT,
    casaApp.endSession,
    `${CONFIG.CONTEXT_PATH}${waypoints.WHAT_HAPPENS_NEXT}`,
  ));
  casaApp.router.get(`/${waypoints.WHAT_HAPPENS_NEXT}`, whatHappensNextGet);

  // End of middleware chain with no matching page, render 404 error
  casaApp.router.get(casaMwPrepare, (req, res) => {
    req.log.error(`Resource '${req.originalUrl}' not found`);
    res.status(404).render('casa/errors/404.njk');
  });

  return {
    app,
  };
};
