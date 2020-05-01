const session = require('express-session');
const connectRedis = require('connect-redis');
const SecureJSON = require('secure-json-parse');
const RedisEncrypter = require('./RedisEncrypter.js');

module.exports = (
  sessionCookieName,
  sessionTtl,
  useTls,
  caChain,
  sessionSecret,
  redisHosts,
  useClusterMode,
  redisClusterListener,
  logger,
  cryptoKeyring = null,
) => {
  // Default session config (will use MemoryStore)
  logger.info('Setting application session timeout to %d seconds', sessionTtl);
  const sessions = {
    name: sessionCookieName,
    ttl: sessionTtl,
    secure: useTls,
    secret: sessionSecret,
    cachain: caChain,
  };

  // If redis instances have been declared, setup redis cluster session store
  if (redisHosts.length > 0) {
    // If a connection cannot be estalished after retries, stop trying. By
    // return a non-numeric response here, we're telling the Redis client to
    // stop any further attempts.
    // ref: https://github.com/luin/ioredis#cluster
    const retryStrategy = (times) => {
      logger.trace('ioredis retry attempt #%d', times);
      if (times > 10) {
        logger.error('Reached max (10) retry attempts. Will exit.');
        return new Error('Reached max (10) retry attempts');
      }
      return Math.min(250 + (times * 50), 1000);
    };

    // Prepare configs
    const redisClusterConfig = {
      enableReadyCheck: true,
      clusterRetryStrategy: retryStrategy,
      keyPrefix: sessionCookieName,
    };
    const redisConfig = {
      enableReadyCheck: true,
      retryStrategy,
      keyPrefix: sessionCookieName,
    };

    // Setup the Redis session store
    logger.info('Initialising Redis session store (cluster mode = %s)', useClusterMode ? 'on' : 'off');
    const RedisStore = connectRedis(session);
    const redisClient = useClusterMode
      ? new RedisEncrypter.Cluster(redisHosts, redisClusterConfig, cryptoKeyring)
      : new RedisEncrypter(redisHosts[0], redisConfig, cryptoKeyring);
    const store = new RedisStore({
      client: redisClient,
      serializer: {
        stringify: JSON.stringify,
        parse: SecureJSON.parse,
      },
      ttl: sessionTtl,
    });

    // Capture all Redis client events and pass onto the provided listener
    ['connect', 'ready', 'error', 'close', 'reconnecting', 'end', '+node', '-node', 'node error'].forEach((eventName) => {
      redisClient.on(eventName, (...args) => {
        logger.trace('Emitting ioredis event %s', eventName);
        redisClusterListener.emit(eventName, ...args);
      });
    });

    return { ...sessions, store };
  }

  // No redis, set no store, will use default memory store
  logger.warn('No Redis hosts defined; falling back to MemoryStore');
  return sessions;
};
