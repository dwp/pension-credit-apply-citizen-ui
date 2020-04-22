/**
 * This suite of tests will concentrate on interactions with Redis.
 *
 * Scope:
 * - Is session data written to Redis correctly?
 * - Is data purged from Redis correctly?
 * - Does the application re-connect to Redis if it goes down temporarily?
 * - Does the application exit if Redis cannot be reconnected?
 */

const { expect } = require('chai');
const YAML = require('yaml');
const fs = require('fs');

const { startService, stopService, tearDownServices } = require('./helpers.js');
const fakeLogger = require('../helpers/fake-logger.js');

const ApiHelperFactory = require('../../lib/ApiHelperFactory.js');
const ClaimServiceFactory = require('../../lib/ClaimServiceFactory.js');

// When starting docker containers, their ports will be published and accessible
// to the docker host machine. Depending on where we run these script, that host
// can be different. Locally it will always be `localhost`, but within a
// docker-in-docker environment, such as when using CI docker executers,
// `localhost` will not work.
// Therefore, use the `LOCAL_HOSTNAME` environment variable to specify the
// hostname to be used.
const LOCAL_HOSTNAME = process.env.LOCAL_HOSTNAME || 'localhost';

// Extract some required config from `service.yaml`
const { services } = YAML.parse(fs.readFileSync(`${__dirname}/services.yaml`, 'utf8'));
const ENDPOINT = services['apply-citizen-ui'].environment.CLAIMSERVICE_API_ENDPOINT.replace('apply-claim-service', LOCAL_HOSTNAME);

describe('ClaimService', () => {
  const claimServiceFactory = new ClaimServiceFactory(new ApiHelperFactory({
    prefixUrl: ENDPOINT,
    httpTimeout: 10,
  }));

  const validClaimPayload = {
    nino: 'RN001001A',
    dateOfBirth: '1940-02-01',
    dateOfClaim: '2020-01-01',
  };

  const TIMEOUT_HOOKS = 60000;
  const TIMEOUT_TESTS = 60000;

  // Tear down all services in case they're still running from previous runs
  before(async function setup() {
    this.timeout(TIMEOUT_HOOKS);
    await tearDownServices();
    await startService('apply-claim-service');
  });

  after(async function teardown() {
    this.timeout(TIMEOUT_HOOKS);
    await tearDownServices();
  });

  describe('submitting claim', () => {
    let claimService;

    before(() => {
      claimService = claimServiceFactory.create({
        logger: fakeLogger(),
        traceId: 'test',
      });
    });

    it('should resolve with a 201 status, and empty body when a valid claim payload is sent', async () => {
      const response = await claimService.submitClaim(validClaimPayload);
      expect(response).to.have.property('statusCode').that.equals(201);
      expect(response).to.have.property('body').that.equals('');
    }).timeout(TIMEOUT_TESTS);

    it('should reject with a 400 HTTPError and errors array when a bad claim payload is sent', async () => {
      try {
        await claimService.submitClaim();
      } catch (ex) {
        expect(ex.name).to.equal('HTTPError');
        expect(ex).to.have.property('response');
        expect(ex.response).to.have.property('statusCode').that.equals(400);
        expect(ex.response).to.have.property('body').that.has.property('errors').that.is.an('array');
      }
    }).timeout(TIMEOUT_TESTS);

    it('should reject with a 404 HTTPError when claim is sent to wrong endpoint', async () => {
      const wrongClaimService = new ClaimServiceFactory(new ApiHelperFactory({
        prefixUrl: `${ENDPOINT}badurl`,
        httpTimeout: 10,
      })).create({
        logger: fakeLogger(),
        traceId: 'test',
      });

      try {
        await wrongClaimService.submitClaim();
      } catch (ex) {
        expect(ex.name).to.equal('HTTPError');
        expect(ex).to.have.property('response');
        expect(ex.response).to.have.property('statusCode').that.equals(404);
      }
    }).timeout(TIMEOUT_TESTS);

    it('should reject with a RequestError when service is not connected', async () => {
      await stopService('apply-claim-service');
      try {
        await claimService.submitClaim();
      } catch (ex) {
        expect(ex.name).to.equal('RequestError');
        expect(ex.code).to.equal('ECONNREFUSED');
      }
    }).timeout(TIMEOUT_TESTS);
  });
});
