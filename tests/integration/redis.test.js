/**
 * This suite of tests will concentrate on interactions with Redis.
 *
 * Scope:
 * - Is session data written to Redis correctly?
 * - Is data purged from Redis correctly?
 * - Does the application re-connect to Redis if it goes down temporarily?
 * - Does the application exit if Redis cannot be reconnected?
 */

const { spawn } = require('child_process');
const { expect } = require('chai');
const got = require('got');
const { Cookie, CookieJar } = require('tough-cookie');
const Redis = require('ioredis');
const YAML = require('yaml');
const fs = require('fs');

// Work around for tough-cookie 4.0.0 support in Got, can be removed when support
// to Got is added in a future release.
// see: https://github.com/sindresorhus/got/issues/1131
function proxy(org, proxifier) {
  return new Proxy(proxifier(org), {
    get: (obj, prop) => (prop in obj ? obj[prop] : org[prop]),
  });
}
function patchJar(jar) {
  return proxy(jar, (obj) => ({
    setCookie: async (rawCookie, url) => obj.setCookie(rawCookie, url, console.log),
    getCookieString: async (url) => obj.getCookieString(url),
  }));
}

const { startService, stopService, tearDownServices } = require('./helpers.js');

// Extract some required config from `service.yaml`
const { services } = YAML.parse(fs.readFileSync(`${__dirname}/services.yaml`, 'utf8'));
const APP_PORT = services['apply-citizen-ui'].ports[0].split(':')[0];
const { SESSION_TTL, SESSION_COOKIE_NAME } = services['apply-citizen-ui'].environment;

// When starting docker containers, their ports will be published and accessible
// to the docker host machine. Depending on where we run these script, that host
// can be different. Locally it will always be `localhost`, but within a
// docker-in-docker environment, such as when using CI docker executers,
// `localhost` will not work.
// Therefore, use the `LOCAL_HOSTNAME` environment variable to specify the
// hostname to be used.
const LOCAL_HOSTNAME = process.env.LOCAL_HOSTNAME || 'localhost';

function extractRedisSessionKey(cookieValue) {
  // connect-redis uses the part of the cookie before `.` as the key. So
  // here we extract the expected key from the returned session cookie value
  return `sess:${decodeURIComponent(cookieValue).replace(/^s:([^.]+)\..+$/, '$1')}`;
}

describe('Redis', () => {
  let redisClient;
  const TIMEOUT_HOOKS = 30000;
  const TIMEOUT_TESTS = 60000;

  // Tear down all services in case they're still running from previous runs
  before(async function setup() {
    this.timeout(TIMEOUT_HOOKS);
    await tearDownServices();
  });

  after(async function teardown() {
    this.timeout(TIMEOUT_HOOKS);
    await tearDownServices();
  });

  afterEach(() => {
    // Disconnect redis client
    if (redisClient) {
      redisClient.disconnect();
      redisClient = null;
    }
  });

  /* -------------------------------------------------------- read/write data */

  describe('session read/write', () => {
    before(async function setupReadWrite() {
      this.timeout(TIMEOUT_TESTS);
      await startService('redis-single-server');
      await startService('apply-citizen-ui');
    });

    it('should create a session on first visit', async () => {
      // Make an initial request so that the app generates a new session
      const { headers } = await got(`http://${LOCAL_HOSTNAME}:${APP_PORT}/start`);
      const cookie = (Array.isArray(headers['set-cookie']) ? headers['set-cookie'].map(Cookie.parse) : [Cookie.parse(headers['set-cookie'])]).filter((c) => c.key === SESSION_COOKIE_NAME).pop();

      // Connect to Redis and assert that the session exists
      const sessionKey = extractRedisSessionKey(cookie.value);
      redisClient = new Redis(`redis://:secret@${LOCAL_HOSTNAME}:8103/`);
      const allKeys = await redisClient.keys('*');
      expect(allKeys).to.contain(sessionKey);
    }).timeout(TIMEOUT_TESTS);

    it('should write submitted data to session', async () => {
      // Make an initial request so that the app generates a new session cookie.
      const { headers } = await got(`http://${LOCAL_HOSTNAME}:${APP_PORT}/start`);
      const cookie = (Array.isArray(headers['set-cookie']) ? headers['set-cookie'].map(Cookie.parse) : [Cookie.parse(headers['set-cookie'])]).filter((c) => c.key === SESSION_COOKIE_NAME).pop();
      const cookieJar = patchJar(new CookieJar());
      cookieJar.setCookieSync(cookie, `http://${LOCAL_HOSTNAME}:${APP_PORT}/`, {});

      // Now make a request that submits data which should be saved to session
      const searchParams = new URLSearchParams([['skipto', 'start']]);
      await got(`http://${LOCAL_HOSTNAME}:${APP_PORT}/start`, {
        followRedirect: false,
        searchParams,
        cookieJar,
      });

      // Connect to Redis and assert that the session exists
      const sessionKey = extractRedisSessionKey(cookie.value);
      redisClient = new Redis(`redis://:secret@${LOCAL_HOSTNAME}:8103/`);
      const data = JSON.parse(await redisClient.get(sessionKey));
      expect(data).to.have.property('journeyContext').that.has.property('data').that.deep.equals({
        start: {
          __skipped__: true,
        },
      });
    }).timeout(TIMEOUT_TESTS);
  });

  /* ----------------------------------------------------------- purging data */

  describe('data purging', () => {
    before(async function setupPurgeData() {
      this.timeout(TIMEOUT_TESTS);
      await startService('redis-single-server');
      await startService('apply-citizen-ui');
    });

    it('should remove data from redis after sesion expiry', async () => {
      // Make an initial request so that the app generates a new session
      const { headers } = await got(`http://${LOCAL_HOSTNAME}:${APP_PORT}/`);
      const cookie = (Array.isArray(headers['set-cookie']) ? headers['set-cookie'].map(Cookie.parse) : [Cookie.parse(headers['set-cookie'])]).filter((c) => c.key === SESSION_COOKIE_NAME).pop();
      const cookieJar = patchJar(new CookieJar());
      cookieJar.setCookieSync(cookie, `http://${LOCAL_HOSTNAME}:${APP_PORT}/`, {});

      // Connect to Redis and assert that the session exists
      const sessionKey = extractRedisSessionKey(cookie.value);
      redisClient = new Redis(`redis://:secret@${LOCAL_HOSTNAME}:8103/`);
      let allKeys = await redisClient.keys('*');
      expect(allKeys).to.contain(sessionKey);

      // Wait for SESSION_TTL to pass, and check session is no longer present.
      // To force the purge of the session we need t omake another request using
      // the same session ID.
      return new Promise((resolve, reject) => {
        // Wait SESSION_TTL seconds
        setTimeout(async () => {
          // Make request, using same session cookie
          await got(`http://${LOCAL_HOSTNAME}:${APP_PORT}/`, { cookieJar });

          // Check Redis no longer has that session in store
          allKeys = await redisClient.keys('*');
          try {
            expect(allKeys).to.not.contain(sessionKey);
            resolve();
          } catch (err) {
            reject(err);
          }
        }, (SESSION_TTL + 2) * 1000);
      });
    }).timeout(TIMEOUT_TESTS);
  });

  /* ----------------------------------------------------------- connectivity */

  describe('connectivity', () => {
    let citizenUiWatcher;

    beforeEach(async function setupConnectivity() {
      this.timeout(TIMEOUT_TESTS);
      await startService('redis-single-server');
      await startService('apply-citizen-ui');

      // Setup a log watcher process. This is the process we watch for exiting,
      // which in turn indicates that the apply-citizen-ui container has stopped running.
      // Once exited, we can inspect the logs to discover the exit code.
      // We use logs for this, rather than the apply-citizen-ui container, because once
      // exited the container is removed, so not accessible to find exit code.
      citizenUiWatcher = spawn('docker-compose', ['-f', `${__dirname}/services.yaml`, 'logs', '-f', 'apply-citizen-ui']);
    });

    afterEach(async function teardownConnectivity() {
      this.timeout(TIMEOUT_TESTS);
      citizenUiWatcher.kill();
      await stopService('redis-single-server');
      await stopService('apply-citizen-ui');
    });

    it('should exit the application with exit code 1 when a connection cannot be made', async () => {
      // Capture exit code of apply-citizen-ui by inspecting ddocker-compose log output
      let exitCode = '';
      citizenUiWatcher.stdout.on('data', (data) => {
        const m = data.toString().match(/exited with code ([0-9]+)/i);
        if (m) {
          exitCode = parseInt(m[1], 10);
        }
      });

      await stopService('redis-single-server');

      // wait for apply-citizen-ui to come down
      return new Promise((resolve) => {
        citizenUiWatcher.on('exit', () => {
          expect(exitCode).to.equal(1);
          resolve();
        });
      });
    }).timeout(TIMEOUT_TESTS);

    it('should reconnect before application exits when connection is temporarily lost', async () => {
      // Watch logs ("info" level) for indicator of connectivity readiness
      let isReconnected = false;
      citizenUiWatcher.stdout.on('data', (data) => {
        if (data.toString().match(/Redis service is ready/)) {
          isReconnected = true;
        }
      });

      // Stop service, and restart a few seconds afterwards
      await stopService('redis-single-server');
      return new Promise((resolve) => {
        setTimeout(async () => {
          await startService('redis-single-server');
          /* eslint-disable-next-line no-unused-expressions */
          expect(isReconnected).to.be.true;
          resolve();
        }, 1000);
      });
    }).timeout(TIMEOUT_TESTS);
  });
});
