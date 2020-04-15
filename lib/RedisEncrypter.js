/* eslint-disable max-classes-per-file,sonarjs/no-identical-functions */

/**
 * A thin Redis client that extends the `ioredis` client to encrypt/decrypt
 * records on their way in/out of Redis.
 */

const Redis = require('ioredis');
const CryptoService = require('<redacted>');

class RedisEncrypter extends Redis {
  // Crypto service
  #cryptoService;

  /**
   *
   * @param {CryptoService} cryptoService DWP crypto service
   * @param {string} host Redis host
   * @param {object} config Redis config
   */
  constructor(cryptoService = null, host, config) {
    if (cryptoService !== null && !(cryptoService instanceof CryptoService)) {
      throw TypeError('cryptoService must be an instance of CryptoService');
    }

    super(host, config);

    this.#cryptoService = cryptoService;
  }

  /**
   * The command args passed here will be in the format:
   *   [
   *     '<session-id>',
   *     '<json-payload>',
   *     'EX',
   *     <ttl>
   *   ]
   *
   * It is the <json-payload> that we want to encrypt before it is stored.
   *
   * References:
   * https://github.com/tj/connect-redis/blob/master/lib/connect-redis.js#L46-L59
   *
   * @param {array} args Redis command parts
   * @param {function} cb Callback
   * @return {void}
   */
  set(args, cb) {
    const cryptoService = this.#cryptoService;
    const commands = args.slice();

    if (cryptoService === null) {
      super.set(commands, cb);
      return;
    }

    const payload = commands[1];
    cryptoService.encrypt({ plaintext: Buffer.from(payload, 'utf8') }).then((enc) => {
      commands[1] = Buffer.from(JSON.stringify(enc)).toString('base64');
      super.set(commands, cb);
    }).catch(cb);
  }

  /**
   * References:
   * https://github.com/tj/connect-redis/blob/master/lib/connect-redis.js#L29-L44
   *
   * @param {string} key Session ID
   * @param {function} cb Callback
   * @return {void}
   */
  get(key, cb) {
    const cryptoService = this.#cryptoService;

    if (cryptoService === null) {
      super.get(key, cb);
      return;
    }

    super.get(key, (err, data) => {
      if (err) {
        cb(err);
      } else if (!data) {
        cb(null, data);
      } else {
        try {
          const buf = Buffer.from(data, 'base64').toString('utf8');
          const enc = JSON.parse(buf);
          cryptoService.decrypt({
            ciphertext: Buffer.from(enc.ciphertext),
            cipherkey: Buffer.from(enc.cipherkey),
          }).then((dec) => {
            cb(null, dec.toString('utf8'));
          }).catch(cb);
        } catch (ex) {
          cb(ex);
        }
      }
    });
  }
}

/* -------------------------------------------------------------------------- */

class RedisClusterEncrypter extends Redis.Cluster {
  // Crypto service
  #cryptoService;

  /**
   *
   * @param {CryptoService} cryptoService DWP crypto service
   * @param {array} host Redis host
   * @param {object} config Redis config
   */
  constructor(cryptoService = null, host, config) {
    if (cryptoService !== null && !(cryptoService instanceof CryptoService)) {
      throw TypeError('cryptoService must be an instance of CryptoService');
    }

    super(host, config);

    this.#cryptoService = cryptoService;
  }
}

RedisClusterEncrypter.prototype.get = RedisEncrypter.prototype.get;
RedisClusterEncrypter.prototype.set = RedisEncrypter.prototype.set;

RedisEncrypter.Cluster = RedisClusterEncrypter;

/* -------------------------------------------------------------------------- */

module.exports = RedisEncrypter;
