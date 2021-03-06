const { configure, middleware } = require('@dwp/govuk-casa');
const express = require('express');
const path = require('path');
const packageMeta = require('./package.json');
const { prepareLogging, prepareRedisListener, prepareCryptoService } = require('./bootstrap/index.js');
const { CONSENT_COOKIE_NAME, waypoints } = require('./lib/constants.js');
const prometheusClient = require('./lib/prometheus-client.js');
const ApiHelperFactory = require('./lib/ApiHelperFactory.js');
const AddressServiceFactory = require('./lib/AddressServiceFactory.js');
const ClaimServiceFactory = require('./lib/ClaimServiceFactory.js');
const getSessionConfig = require('./lib/get-session-config.js');
const mediaMiddleware = require('./middleware/media.js');
const nonceMiddleware = require('./middleware/nonce.js');
const timeoutMiddleware = require('./middleware/session-timeout.js');
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
const cookieMiddleware = require('./middleware/cookie-message.js');
const cookieDetailsGet = require('./routes/cookies/cookie-details.get.js');
const cookiePolicyPost = require('./routes/cookies/cookie-policy.post.js');
const cookiePolicyGet = require('./routes/cookies/cookie-policy.get.js');
const northernIrelandPrerenderHook = require('./definitions/hooks/common/northern-ireland-claim.js');

module.exports = (CONFIG, baseLogger) => {
  baseLogger.info(`CACHAIN has ${!CONFIG.CACHAIN ? 'not ' : ''}been found`);

  // Set up Express to use base logger for all requests
  const app = express();
  prepareLogging(
    app,
    baseLogger,
    CONFIG.TRACE_REQUEST_HEADER_NAME,
    CONFIG.SESSION_COOKIE_NAME,
    CONFIG.LOG_HEADERS,
  );

  // Add some custom media assets (CSS, JS) to be served from the CASA router.
  // Serve this up before CASA middleware
  mediaMiddleware(
    app,
    CONFIG.CONTEXT_PATH_PROXY,
    './dist/',
    CONFIG.AGGRESSIVE_ASSET_CACHING,
  );

  // Setup Redis cluster listener in order to handler the session store lifecycle
  // properly. We'll present a 500 page to all users if Redis is not contactable.
  // ref: https://github.com/luin/ioredis#events
  const redisClusterListener = prepareRedisListener(baseLogger, process.exit);

  // Prepare cryptoservice
  const cryptoService = prepareCryptoService({
    logger: baseLogger,
    mode: CONFIG.REDIS_ENCRYPTION_MODE,
    localMasterKey: CONFIG.REDIS_ENCRYPTION_LOCAL_KEY,
    kmsKeyArn: CONFIG.REDIS_ENCRYPTION_ARN,
    kmsCacheTtl: CONFIG.REDIS_ENCRYPTION_CACHE_TTL,
    kmsCacheCapacity: CONFIG.REDIS_ENCRYPTION_CACHE_CAPACITY,
    kmsCacheReuse: CONFIG.REDIS_ENCRYPTION_CACHE_REUSE_LIMIT,
    kmsEndpoint: CONFIG.AWS_KMS_ENDPOINT,
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
        path.resolve(__dirname, 'node_modules/hmrc-frontend'),
      ],
    },
    compiledAssetsDir: path.resolve(__dirname, 'static'),
    phase: 'alpha',
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
      CONFIG.REDIS_ENCRYPTION_SUITE,
      CONFIG.REDIS_ENCRYPTION_CONTEXT_TAG,
    ),
    i18n: {
      dirs: [path.resolve(__dirname, 'locales')],
      locales: ['en', 'cy'],
    },
    allowPageEdit: true,
    useStickyEdit: false,
    mountController: function casaMountController(mountCommonMiddleware) {
      mountCommonMiddleware();
      timeoutMiddleware(
        this.expressApp,
        CONFIG.CONTEXT_PATH_PROXY,
        waypoints,
        CONFIG.SESSION_TTL,
        CONFIG.TIMEOUT_DIALOG_COUNTDOWN,
      );
      nonceMiddleware(this.expressApp, CONFIG.ENABLE_CSP);
      cookieMiddleware(
        this.expressApp,
        CONSENT_COOKIE_NAME,
        waypoints,
        CONFIG.CONTEXT_PATH,
        CONFIG.CONTEXT_PATH_PROXY,
        CONFIG.GOOGLE_TAG_MANAGER_DOMAIN,
        CONFIG.USE_TLS,
      );
    },
  });

  // Load custon nunjucks filters
  app.get('nunjucksEnv').addFilter('push', viewFilterPush);
  app.get('nunjucksEnv').addFilter('setAttribute', viewFilterSetAtrtribute);
  app.get('nunjucksEnv').addFilter('formatMoney', viewFilterFormatMoney);
  app.get('nunjucksEnv').addFilter('formatNino', viewFilterFormatNino);

  // Add relase version number to views
  app.get('nunjucksEnv').addGlobal('version', packageMeta.version);

  // Add Google Tag Manger ID to view
  app.get('nunjucksEnv').addGlobal('googleTagManagerId', CONFIG.GOOGLE_TAG_MANAGER_ID);

  // Start page URL
  app.get('nunjucksEnv').addGlobal('startUrl', waypoints.START);

  // Set accessibility statment footer URL
  app.get('nunjucksEnv').addGlobal('accessibilityStatementUrl', waypoints.ACCESSIBILITY_STATEMENT);

  // Set URL for feedback survey
  app.get('nunjucksEnv').addGlobal('feedbackSurveyUrl', 'https://getinvolved.dwp.gov.uk/digital/7ae6ef38');

  // Prepare page hooks for "Select your address" page
  const appPageDefinitions = pageDefinitions(
    addressServiceFactory,
    casaApp.config.mountUrl,
    CONFIG.SESSION_TTL,
  );
  const appUserJourney = journeyPlan(baseLogger);

  // Personal Information Charter; the footer links change for NI customers so
  // here we use the NI hook to make the `isNorthernIrelandClaim` flag
  // available to the main layout template.
  // Must be defined before CASA page handlers, otherwise it will never be run
  // as those handlers finalise the response via res.render().
  casaApp.router.use(northernIrelandPrerenderHook(waypoints));

  // Load CASA page and user journey definitions
  casaApp.loadDefinitions(appPageDefinitions, appUserJourney);

  // Prepare some CASA page handlers
  const casaMwPrepare = middleware.pagePrepareRequest(appUserJourney);
  const casaMwEditMode = middleware.pageEditMode(casaApp.config.allowPageEdit);
  const casaMwRails = middleware.pageJourneyRails(CONFIG.CONTEXT_PATH, appUserJourney);

  // Claim submission handlers. Order is significant, and must match the order
  // used within CASA itself (middleware/page/index.js)
  const submissionCommonMw = [casaMwPrepare, middleware.pageCsrf, casaMwEditMode, casaMwRails];

  // Index route
  casaApp.router.get('/', (req, res) => {
    // Redirect to first page in the journey
    res.status(302).redirect(`${casaApp.config.mountUrl}${waypoints.START}`);
  });

  // Accessibility statement
  casaApp.router.get(`/${waypoints.ACCESSIBILITY_STATEMENT}`, (req, res) => {
    res.render('pages/accessibility-statement.njk');
  });

  // Session keep alive, timeout dialog hits this end point to extend session
  casaApp.router.get(`/${waypoints.SESSION_KEEP_ALIVE}`, (req, res) => {
    res.status(200).end();
  });

  // User ended session
  casaApp.router.get(`/${waypoints.SESSION_ENDED}`, (req, res, next) => {
    const lang = req.casa.journeyContext.nav.language;

    req.session.regenerate((error) => {
      // Persist language choice after session regneration
      req.session.language = lang;

      if (error) {
        return next(error);
      }

      return req.session.save(() => res.status(200).render('casa/session-ended.njk'));
    });
  });

  // Cookie policy pages
  casaApp.router.get(`/${waypoints.COOKIE_DETAILS}`, submissionCommonMw, cookieDetailsGet(
    waypoints,
    CONSENT_COOKIE_NAME,
    CONFIG.SESSION_COOKIE_NAME,
    CONFIG.SESSION_TTL,
  ));
  casaApp.router.get(`/${waypoints.COOKIE_POLICY}`, submissionCommonMw, cookiePolicyGet(waypoints));
  casaApp.router.post(`/${waypoints.COOKIE_POLICY}`, submissionCommonMw, cookiePolicyPost(
    CONSENT_COOKIE_NAME,
    casaApp.config.mountUrl,
    CONFIG.GOOGLE_TAG_MANAGER_DOMAIN,
    CONFIG.USE_TLS,
  ));

  // Check your answers page
  casaApp.router.get(`/${waypoints.CHECK_YOUR_ANSWERS}`, submissionCommonMw, checkYourAnswersGet(
    `${CONFIG.CONTEXT_PATH}${waypoints.CHECK_YOUR_ANSWERS}`,
    appUserJourney,
    CONFIG.HTTP_TIMEOUT,
  ));
  casaApp.router.post(`/${waypoints.CHECK_YOUR_ANSWERS}`, submissionCommonMw, checkYourAnswersPost(
    `${CONFIG.CONTEXT_PATH}${waypoints.CHECK_YOUR_ANSWERS}`,
    appUserJourney,
    claimServiceFactory,
    CONFIG.HTTP_TIMEOUT,
    casaApp.endSession,
    `${CONFIG.CONTEXT_PATH}${waypoints.WHAT_HAPPENS_NEXT}`,
  ));

  // What happens next
  casaApp.router.get(`/${waypoints.WHAT_HAPPENS_NEXT}`, whatHappensNextGet);

  // End of middleware chain with no matching page, render 404 error
  casaApp.router.get(casaMwPrepare, northernIrelandPrerenderHook(waypoints), (req, res) => {
    req.log.info(`Resource '${req.originalUrl}' not found`);
    res.status(404).render('casa/errors/404.njk');
  });

  return {
    app,
  };
};
