const { expect } = require('chai');
const sinon = require('sinon');
const ioredis = require('ioredis');

const LocalKeyProvider = require('<redacted>/LocalKeyProvider');
const CryptoService = require('<redacted>');

const RedisEncrypter = require('../../lib/RedisEncrypter.js');

// Setup a crypto service whose responses we control
const validCryptoService = new CryptoService(new LocalKeyProvider({
  keySize: 256,
  keyCipher: Buffer.from('a'),
}));

const encryptionResponse = { ciphertext: 'data', cipherkey: 'key' };
const encryptionResponseBase64 = Buffer.from(JSON.stringify(encryptionResponse)).toString('base64');

validCryptoService.encrypt = sinon.stub().resolves(encryptionResponse);
validCryptoService.decrypt = sinon.stub().resolves('decrypted payload');

describe('RedisEncrypter', () => {
  let originalGet;
  let originalSet;

  beforeEach(() => {
    originalGet = ioredis.prototype.get;
    originalSet = ioredis.prototype.set;
  });

  afterEach(() => {
    ioredis.prototype.get = originalGet;
    ioredis.prototype.set = originalSet;
  });

  describe('RedisEncrypter', () => {
    it('should extend the ioredis classes', () => {
      const redisProto = Object.getPrototypeOf(RedisEncrypter.prototype);
      const clusterProto = Object.getPrototypeOf(RedisEncrypter.Cluster.prototype);

      expect(redisProto.constructor).to.equal(ioredis);
      expect(clusterProto.constructor).to.equal(ioredis.Cluster);
    });

    it('should throw a TypeError if an invalid crypto service is provided', () => {
      expect(() => new RedisEncrypter('x')).to.throw(TypeError, 'cryptoService must be an instance of CryptoService');
      expect(() => new RedisEncrypter(() => {})).to.throw(TypeError, 'cryptoService must be an instance of CryptoService');
    });

    it('should not throw when given a valid crypto service, or no crypto service', () => {
      expect(() => {
        const r = new RedisEncrypter(validCryptoService);
        r.disconnect();
      }).to.not.throw();

      expect(() => {
        const r = new RedisEncrypter();
        r.disconnect();
      }).to.not.throw();
    });

    it('should call super.set() with plaintext payload when no cryptoservice is present', (done) => {
      const stub = sinon.stub(ioredis.prototype, 'set').callsFake((commands, cb) => cb());

      const r = new RedisEncrypter(null, '', {});
      r.set(['a', 'b', 'c', 'd'], () => {
        r.disconnect();
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

      const r = new RedisEncrypter(null, '', {});
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

      const r = new RedisEncrypter(validCryptoService, '', {});
      r.set(['a', 'b', 'c', 'd'], () => {
        r.disconnect();
        try {
          expect(stub).to.be.calledOnceWith(['a', encryptionResponseBase64, 'c', 'd']);
          done();
        } catch (ex) {
          done(ex);
        }
      });
    });

    it('should decode the decrypted data from the redis store', (done) => {
      sinon.stub(ioredis.prototype, 'get').callsFake((err, cb) => cb(null, encryptionResponseBase64));

      const r = new RedisEncrypter(validCryptoService, '', {});
      r.get('key', (err, data) => {
        r.disconnect();
        try {
          expect(data).to.equal('decrypted payload');
          done();
        } catch (ex) {
          done(ex);
        }
      });
    });

    it('should call the callback with an error super.get() results in an error', (done) => {
      const error = new Error('test error');
      sinon.stub(ioredis.prototype, 'get').callsFake((err, cb) => cb(error));

      const r = new RedisEncrypter(validCryptoService, '', {});
      r.get('key', (err) => {
        r.disconnect();
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

      const r = new RedisEncrypter(validCryptoService, '', {});
      r.get('key', (err, data) => {
        r.disconnect();
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
      const error = new Error('test error');
      sinon.stub(ioredis.prototype, 'get').callsFake((err, cb) => cb(null, encryptionResponseBase64));

      const stubCryptoservice = new CryptoService(new LocalKeyProvider({
        keySize: 256,
        keyCipher: Buffer.from('a'),
      }));
      stubCryptoservice.decrypt = sinon.stub().rejects(error);

      const r = new RedisEncrypter(stubCryptoservice, '', {});
      r.get('key', (err) => {
        r.disconnect();
        try {
          expect(err).to.equal(error);
          done();
        } catch (ex) {
          done(ex);
        }
      });
    });

    it('should call the callback with an error if JSON parsing throws', (done) => {
      sinon.stub(ioredis.prototype, 'get').callsFake((err, cb) => cb(null, 'will throw JSON error'));

      const r = new RedisEncrypter(validCryptoService, '', {});
      r.get('key', (err) => {
        r.disconnect();
        try {
          expect(err).to.be.an.instanceof(SyntaxError);
          done();
        } catch (ex) {
          done(ex);
        }
      });
    });
  });

  describe('RedisEncrypter.Cluster', () => {
    it('should throw a TypeError if an invalid crypto service is provided', () => {
      expect(() => new RedisEncrypter.Cluster('x')).to.throw(TypeError, 'cryptoService must be an instance of CryptoService');
      expect(() => new RedisEncrypter.Cluster(() => {})).to.throw(TypeError, 'cryptoService must be an instance of CryptoService');
    });

    it('should not throw when given a valid crypto service, or no crypto service', () => {
      expect(() => {
        const r = new RedisEncrypter.Cluster(validCryptoService);
        r.disconnect();
      }).to.not.throw();

      expect(() => {
        const r = new RedisEncrypter.Cluster();
        r.disconnect();
      }).to.not.throw();
    });
  });
});
