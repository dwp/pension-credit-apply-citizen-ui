const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const { testutils: { concatWaypoints } } = require('@dwp/govuk-casa');

const { startService, stopService } = require('../integration/helpers.js');
const ConfigIngestor = require('../../lib/ConfigIngestor.js');
const createLogger = require('../../bootstrap/base-logger.js');
const createAppInstance = require('../../app.js');

// Extract some required config from `service.yaml`
const { services } = YAML.parse(fs.readFileSync(path.resolve(__dirname, '../integration/services.yaml'), 'utf8'));
const LOCATION_SERVICE_PORT = services['location-service-stub'].ports[0].split(':')[0];
const { NODE_TLS_REJECT_UNAUTHORIZED } = process.env;

// When starting docker containers, their ports will be published and accessible
// to the docker host machine. Depending on where we run these script, that host
// can be different. Locally it will always be `localhost`, but within a
// docker-in-docker environment, such as when using CI docker executers,
// `localhost` will not work.
// Therefore, use the `LOCAL_HOSTNAME` environment variable to specify the
// hostname to be used.
const LOCAL_HOSTNAME = process.env.LOCAL_HOSTNAME || 'localhost';

function createApp(configOptions = {}) {
  const config = ConfigIngestor({
    LOG_LEVEL: 'fatal',
    ADDRESSSERVICE_API_ENDPOINT: `https://${LOCAL_HOSTNAME}:${LOCATION_SERVICE_PORT}/location-service/v1`,
    ...process.env,
    ...configOptions,
  });

  // We _must not_ wrap the DEBUG module in our logger, otherwise we'll get an
  // error related to the `pino-debug` requirement that it must be initialised
  // before `debug()` is used anywhere in the app.
  const logger = createLogger(config.LOG_LEVEL, false);

  const { app } = createAppInstance(config, logger);

  // Generate a server listening on a random port
  // return new Promise((resolve) => {
  //   const server = http.createServer(app);
  //   server.listen(() => resolve({ app, end: server.close.bind(server) }));
  // });
  return app;
}

function customWaypointHandlerFactory({ mountUrl, waypointId, dom }) {
  let waypoint;
  const src = path.resolve(__dirname, `waypoints/${waypointId}.js`);

  if (fs.existsSync(src)) {
    /* eslint-disable-next-line import/no-dynamic-require,global-require */
    const TestWaypointClass = require(src);
    waypoint = new TestWaypointClass({ mountUrl, waypointId, dom });
  }

  return waypoint;
}

function loadPersonaJourney(personaSource) {
  return YAML.parse(fs.readFileSync(`${__dirname}/personas/${personaSource}.yml`, 'utf8')).journey;
}

function mergePersonaJourneys(personaSources = []) {
  return personaSources.reduce((obj, persona) => concatWaypoints(obj, loadPersonaJourney(persona)),
  // return { ...obj, ...loadPersonaJourney(persona) };
    {});
}

function withService(service, TIMEOUT) {
  before(async function setup() {
    this.timeout(TIMEOUT);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    await startService(service);
  });

  after(async function teardown() {
    this.timeout(TIMEOUT);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = NODE_TLS_REJECT_UNAUTHORIZED;
    await stopService(service);
  });
}

module.exports = {
  createApp,
  customWaypointHandlerFactory,
  loadPersonaJourney,
  mergePersonaJourneys,
  withService,
};
