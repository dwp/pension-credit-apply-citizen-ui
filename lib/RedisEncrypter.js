/* eslint-disable max-classes-per-file,sonarjs/no-identical-functions */
/**
 * A thin Redis client that extends the `ioredis` client to encrypt/decrypt
 * records on their way in/out of Redis.
 */

const Redis = require('ioredis');
const {
  encrypt, decrypt, KeyringNode, NodeCachingMaterialsManager,
} = require('@aws-crypto/client-node');

// Using WeakMap to hold private properties rather than ES6 native privates
// because of this: https://stackoverflow.com/questions/61237153/access-private-method-in-an-overriden-method-called-from-the-base-class-construc
// We are overriding the set/get methods.
const pryvate = new WeakMap();

class RedisEncrypter extends Redis {
  /**
   *
   * @param {string} host Redis host
   * @param {object} config ioredis config
   * @param {KeyringNode|NodeCachingMaterialsManager} keyring Crypto keyring
   * @param {object} encryptionContext Context to attach to all encrypted records
   */
  constructor(host, config, keyring = null, encryptionContext = {}) {
    if (
      keyring !== null
      && !(keyring instanceof KeyringNode)
      && !(keyring instanceof NodeCachingMaterialsManager)
    ) {
      throw TypeError('keyring must be an instance of KeyringNode or NodeCachingMaterialsManager');
    }

    if (Object.prototype.toString.call(encryptionContext) !== '[object Object]') {
      throw new TypeError('encryptionContext must be an Object');
    }

    super(host, config);

    pryvate.set(this, {
      keyring,
      encryptionContext,
    });
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
    const { keyring } = pryvate.get(this);
    const commands = args.slice();

    if (keyring === null) {
      super.set(commands, cb);
      return;
    }

    const payload = commands[1];

    encrypt(keyring, payload, {
      encryptionContext: this.encryptionContext,
      plaintextLength: Buffer.byteLength(payload, 'utf8'),
    }).then(({ result }) => {
      commands[1] = result.toString('base64');
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
    const { keyring } = pryvate.get(this);

    if (keyring === null) {
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
          const ciphertext = Buffer.from(data, 'base64');
          decrypt(keyring, ciphertext).then(({ plaintext, messageHeader }) => {
            this.verifyEncryptionContext(messageHeader.encryptionContext);
            cb(null, plaintext.toString('utf8'));
          }).catch(cb);
        } catch (ex) {
          cb(ex);
        }
      }
    });
  }

  verifyEncryptionContext(context) {
    const { encryptionContext } = pryvate.get(this);

    Object.entries(encryptionContext).forEach(([key, value]) => {
      if (context[key] !== value) {
        throw new Error(`Payload tampering detected on key '${key}'`);
      }
    });
  }
}

/* -------------------------------------------------------------------------- */

class RedisClusterEncrypter extends Redis.Cluster {
  /**
   *
   * @param {array} host Redis host
   * @param {object} config Redis config
   * @param {KeyringNode|NodeCachingMaterialsManager} keyring Crypto keyring
   * @param {object} encryptionContext Context to attach to all encrypted records
   */
  constructor(host, config, keyring = null, encryptionContext = {}) {
    if (keyring !== null && !(keyring instanceof KeyringNode)) {
      throw TypeError('keyring must be an instance of KeyringNode or NodeCachingMaterialsManager');
    }

    if (Object.prototype.toString.call(encryptionContext) !== '[object Object]') {
      throw new TypeError('encryptionContext must be an Object');
    }

    super(host, config);

    pryvate.set(this, {
      keyring,
      encryptionContext,
    });
  }
}

RedisClusterEncrypter.prototype.get = RedisEncrypter.prototype.get;
RedisClusterEncrypter.prototype.set = RedisEncrypter.prototype.set;

RedisEncrypter.Cluster = RedisClusterEncrypter;

/* -------------------------------------------------------------------------- */

module.exports = RedisEncrypter;
