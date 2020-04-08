const { configure, middleware } = require('@dwp/govuk-casa');
const express = require('express');
const path = require('path');
const { waypoints } = require('./lib/constants.js');
const ApiHelperFactory = require('./lib/ApiHelperFactory.js');
const AddressServiceFactory = require('./lib/AddressServiceFactory.js');
const getSessionConfig = require('./lib/get-session-config.js');
const mediaMiddleware = require('./middleware/media.js');
const nonceMiddleware = require('./middleware/nonce.js');
const idBarMiddleware = require('./middleware/id-bar.js');
const { prepareLogging, prepareRedisListener } = require('./bootstrap/index.js');
const packageMeta = require('./package.json');
const routeActuatorIndex = require('./routes/actuator/index.js');
const viewFilterPush = require('./view-filters/push.js');
const viewFilterSetAtrtribute = require('./view-filters/set-attribute.js');
const viewFilterFormatMoney = require('./utils/format-money.js');
const viewFilterFormatNino = require('./utils/format-nino.js');
const pageDefinitions = require('./definitions/pages.js');
const journeyPlan = require('./definitions/journey.js');

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

  // Load the router index controller for the 3 endpoints
  // /actuator/health
  // /actuator/info
  // /actuator/metrics
  const { name, description, version } = packageMeta;
  const actuatorRouter = express.Router();
  routeActuatorIndex(actuatorRouter, { name, description, version });

  app.use(`${CONFIG.CONTEXT_PATH}actuator`, actuatorRouter);

  // Create a new CASA application instance.
  const casaApp = configure(app, {
    mountUrl: CONFIG.CONTEXT_PATH,
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
    ),
    i18n: {
      dirs: [path.resolve(__dirname, 'locales')],
      locales: ['en'],
    },
    allowPageEdit: true,
    mountController: function casaMountController(mountCommonMiddleware) {
      // Add some custom media assets (CSS, JS) to be served from the CASA router.
      // Serve this up before CASA middleware
      mediaMiddleware(this.expressApp, CONFIG.CONTEXT_PATH, './public/');
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
  const addressServiceFactory = new AddressServiceFactory(new ApiHelperFactory({
    prefixUrl: CONFIG.ADDRESSSERVICE_API_ENDPOINT,
    traceRequestHeaderName: CONFIG.OUTBOUND_TRACE_REQUEST_HEADER_NAME,
    httpTimeout: CONFIG.HTTP_TIMEOUT,
    cachain: CONFIG.CACHAIN,
  }));

  const appPageDefinitions = pageDefinitions(
    addressServiceFactory,
    casaApp.config.mountUrl,
  );
  const appUserJourney = journeyPlan(baseLogger);

  // Load CASA page and user journey definitions
  casaApp.loadDefinitions(appPageDefinitions, appUserJourney);

  // End of middleware chain with no matching page, render 404 error
  casaApp.router.get(middleware.pagePrepareRequest(appUserJourney), (req, res) => {
    req.log.error(`Resource '${req.originalUrl}' not found`);
    res.status(404).render('casa/errors/404.njk');
  });

  return {
    app,
  };
};
