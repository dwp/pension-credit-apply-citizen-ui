const { expect } = require('chai');
const sinon = require('sinon');
const ioredis = require('ioredis');
const { randomBytes } = require('crypto');
const proxyquire = require('proxyquire');

const {
  encrypt,
  RawAesKeyringNode,
  RawAesWrappingSuiteIdentifier,
} = require('@aws-crypto/client-node');

const RedisEncrypter = require('../../lib/RedisEncrypter.js');

describe('RedisEncrypter', () => {
  const testKeyring = new RawAesKeyringNode({
    keyNamespace: 'pencred',
    keyName: 'apply-citizen-ui-session-key',
    unencryptedMasterKey: randomBytes(32),
    wrappingSuite: RawAesWrappingSuiteIdentifier.AES256_GCM_IV12_TAG16_NO_PADDING,
  });

  const testPlaintextPayload = 'testPayload';
  let testEncryptedPayload;

  let originalGet;
  let originalSet;

  const redisHost = '';
  const redisOpts = { lazyConnect: true };

  beforeEach(async () => {
    originalGet = ioredis.prototype.get;
    originalSet = ioredis.prototype.set;
    testEncryptedPayload = await encrypt(testKeyring, testPlaintextPayload, {
      plaintextLength: Buffer.byteLength(testPlaintextPayload, 'utf8'),
    });
    testEncryptedPayload = testEncryptedPayload.result.toString('base64');
  });

  afterEach(() => {
    ioredis.prototype.get = originalGet;
    ioredis.prototype.set = originalSet;
  });

  /* ------------------------------------------------------------------ tests */
  describe('RedisEncrypter', () => {
    it('should extend the ioredis classes', () => {
      const redisProto = Object.getPrototypeOf(RedisEncrypter.prototype);
      const clusterProto = Object.getPrototypeOf(RedisEncrypter.Cluster.prototype);

      expect(redisProto.constructor).to.equal(ioredis);
      expect(clusterProto.constructor).to.equal(ioredis.Cluster);
    });

    it('should throw a TypeError if an invalid keyring is provided', () => {
      const message = 'keyring must be an instance of KeyringNode or NodeCachingMaterialsManager';
      expect(() => new RedisEncrypter(redisHost, redisOpts, 'x')).to.throw(TypeError, message);
      expect(() => new RedisEncrypter(redisHost, redisOpts, () => {})).to.throw(TypeError, message);
    });

    it('should not throw when given a valid keyring, or no keyring', () => {
      expect(() => new RedisEncrypter(redisHost, redisOpts, testKeyring)).to.not.throw();

      expect(() => new RedisEncrypter(redisHost, redisOpts)).to.not.throw();
    });

    it('should throw a TypeError if an invalid encryption context is provided', () => {
      const message = 'encryptionContext must be an Object';
      expect(() => new RedisEncrypter(redisHost, redisOpts, testKeyring, 'x')).to.throw(TypeError, message);
    });

    it('should throw a ReferenceError if an invalid cipher suite id is provided', () => {
      const message = 'cipherSuite must be a valid AWS SDK suite identifier';
      expect(() => new RedisEncrypter(
        redisHost,
        redisOpts,
        testKeyring,
        {},
        1234,
      )).to.throw(ReferenceError, message);
    });

    describe('set()', () => {
      it('should call super.set() with plaintext payload when no cryptoservice is present', (done) => {
        const stub = sinon.stub(ioredis.prototype, 'set').callsFake((commands, cb) => cb());

        const r = new RedisEncrypter(redisHost, redisOpts, null);
        r.set(['a', 'b', 'c', 'd'], () => {
          try {
            expect(stub).to.be.calledOnceWith(['a', 'b', 'c', 'd']);
            done();
          } catch (ex) {
            done(ex);
          }
        });
      });

      it('should super.get() with original callback when no crypsoservice is used', (done) => {
        const stubCallback = sinon.stub();
        const spyGet = sinon.spy(ioredis.prototype, 'get');

        const r = new RedisEncrypter(redisHost, redisOpts, null);
        r.get('key', stubCallback);
        r.disconnect();
        try {
          expect(spyGet).to.be.calledOnceWith('key', stubCallback);
          done();
        } catch (ex) {
          done(ex);
        }
      });

      it('should call super.set() with the base64-encoded, encrypted payload', (done) => {
        const stub = sinon.stub(ioredis.prototype, 'set').callsFake((commands, cb) => cb());

        const r = new RedisEncrypter(redisHost, redisOpts, testKeyring, { test: 'test-enc-context' });
        r.set(['a', 'b', 'c', 'd'], () => {
          try {
            const payload = stub.getCall(0).args[0][1];
            expect(payload).to.be.a('string');
            // The 'apply-citizen-ui-session-key' is part of the expected
            // encryption context
            expect(Buffer.from(payload, 'base64').toString('utf8')).to.match(/apply-citizen-ui-session-key/);
            expect(Buffer.from(payload, 'base64').toString('utf8')).to.match(/test-enc-context/);
            expect(stub).to.be.calledOnceWith(['a', payload, 'c', 'd']);
            done();
          } catch (ex) {
            done(ex);
          }
        });
      });
    });

    describe('get()', () => {
      it('should decode the decrypted data from the redis store', (done) => {
        sinon.stub(ioredis.prototype, 'get').callsFake((err, cb) => cb(null, testEncryptedPayload));

        const r = new RedisEncrypter(redisHost, redisOpts, testKeyring);
        r.get('key', (err, data) => {
          try {
            expect(data).to.equal(testPlaintextPayload);
            done();
          } catch (ex) {
            done(ex);
          }
        });
      });

      it('should call the callback with an error super.get() results in an error', (done) => {
        const error = new Error('test error');
        sinon.stub(ioredis.prototype, 'get').callsFake((err, cb) => cb(error));

        const r = new RedisEncrypter(redisHost, redisOpts, testKeyring);
        r.get('key', (err) => {
          try {
            expect(err).to.equal(error);
            done();
          } catch (ex) {
            done(ex);
          }
        });
      });

      it('should call the callback with an empty data value super.get() results in no data', (done) => {
        const testData = '';
        sinon.stub(ioredis.prototype, 'get').callsFake((err, cb) => cb(null, testData));

        const r = new RedisEncrypter(redisHost, redisOpts, testKeyring);
        r.get('key', (err, data) => {
          try {
            expect(err).to.equal(null);
            expect(data).to.equal(testData);
            done();
          } catch (ex) {
            done(ex);
          }
        });
      });

      it('should call the callback with an error if cryptoservice rejects', (done) => {
        const error = new Error('TEST ERROR');
        const decryptStub = sinon.stub().rejects(error);

        const RedisEncrypterProxy = proxyquire('../../lib/RedisEncrypter.js', {
          '@aws-crypto/client-node': {
            decrypt: decryptStub,
          },
        });
        sinon.stub(ioredis.prototype, 'get').callsFake((err, cb) => cb(null, 'ignoreddata'));

        const r = new RedisEncrypterProxy(redisHost, redisOpts, testKeyring);
        r.get('key', (err) => {
          try {
            expect(err).to.equal(error);
            done();
          } catch (ex) {
            done(ex);
          }
        });
      });

      it('should call the callback with an error if the encryption context does not match original', (done) => {
        const decryptStub = sinon.stub().resolves({
          plaintext: 'originalPayload',
          messageHeader: {
            encryptionContext: { original: 'data' },
          },
        });

        const RedisEncrypterProxy = proxyquire('../../lib/RedisEncrypter.js', {
          '@aws-crypto/client-node': {
            decrypt: decryptStub,
          },
        });
        sinon.stub(ioredis.prototype, 'get').callsFake((err, cb) => cb(null, 'ignoreddata'));

        const r = new RedisEncrypterProxy(redisHost, redisOpts, testKeyring, { original: 'tampered' });
        r.get('key', (err) => {
          try {
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Payload tampering detected on key \'original\'');
            done();
          } catch (ex) {
            done(ex);
          }
        });
      });
    });
  });

  describe('RedisEncrypter.Cluster', () => {
    it('should throw a TypeError if an invalid keyring is provided', () => {
      const msg = 'keyring must be an instance of KeyringNode or NodeCachingMaterialsManager';
      const noop = function () {};
      expect(() => new RedisEncrypter.Cluster(redisHost, redisOpts, 'x')).to.throw(TypeError, msg);
      expect(() => new RedisEncrypter.Cluster(redisHost, redisOpts, noop)).to.throw(TypeError, msg);
    });

    it('should not throw when given a valid crypto service, or no crypto service', () => {
      expect(() => new RedisEncrypter.Cluster(redisHost, redisOpts, testKeyring)).to.not.throw();

      expect(() => new RedisEncrypter.Cluster(redisHost, redisOpts)).to.not.throw();
    });
  });
});
