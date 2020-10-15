const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const fakeLogger = require('../helpers/fake-logger.js');

describe('get-session-config', () => {
  let stubRedisStore;

  const getSessionConfig = proxyquire('../../lib/get-session-config.js', {
    'connect-redis': sinon.stub().callsFake(() => stubRedisStore),
    './RedisEncrypter.js': sinon.stub().returns({ on: sinon.stub() }),
  });

  it('should return non-redis config if not Redis hosts are specified', () => {
    const config = getSessionConfig('name', 60, true, 'CA_CHAIN', 'secret', [], null, null, fakeLogger(), null);

    expect(config).to.deep.equal({
      name: 'name',
      ttl: 60,
      secure: true,
      secret: 'secret',
      cachain: 'CA_CHAIN',
      cookieSameSite: 'Lax',
    });
  });

  it('should create a Rddis store and return it', () => {
    const stubStoreInstance = {};
    stubRedisStore = sinon.stub().callsFake(() => stubStoreInstance);
    const stubListener = {
      emit: sinon.stub(),
    };

    const config = getSessionConfig('name', 60, true, 'CA_CHAIN', 'secret', ['secret@host:1234'], false, stubListener, fakeLogger(), null);

    expect(config).to.have.property('store').that.equals(stubStoreInstance);
    return expect(stubRedisStore).to.be.calledOnce;
  });
});
