const { AlgorithmSuiteIdentifier } = require('@aws-crypto/client-node');

const validCipherSuiteIds = Object.values(AlgorithmSuiteIdentifier);

const ConfigIngestor = (config = {}) => {
  const parsed = {
    NODE_ENV: config.NODE_ENV || 'development',
    PORT: config.PORT ? parseInt(config.PORT, 10) : null,
    USE_TLS: config.USE_TLS === 'true',
    TLS_CERT: config.TLS_CERT || null,
    TLS_KEY: config.TLS_KEY || null,
    CACHAIN: config.CACHAIN || null,
    SESSION_SECRET: config.SESSION_SECRET || 'SuperSecretSecret',
    SESSION_TTL: parseInt(config.SESSION_TTL || 1800, 10),
    DISABLE_SESSION_TTL_RESTRICTIONS: config.DISABLE_SESSION_TTL_RESTRICTIONS === 'true',
    REDIS_HOSTS: config.REDIS_HOSTS || null,
    REDIS_CLUSTER_MODE: config.REDIS_CLUSTER_MODE === 'true',
    REDIS_ENCRYPTION_MODE: config.REDIS_ENCRYPTION_MODE || '',
    REDIS_ENCRYPTION_LOCAL_KEY: config.REDIS_ENCRYPTION_LOCAL_KEY,
    REDIS_ENCRYPTION_ARN: config.REDIS_ENCRYPTION_ARN || null,
    REDIS_ENCRYPTION_CACHE_TTL: config.REDIS_ENCRYPTION_CACHE_TTL,
    REDIS_ENCRYPTION_CACHE_CAPACITY: config.REDIS_ENCRYPTION_CACHE_CAPACITY,
    REDIS_ENCRYPTION_CACHE_REUSE_LIMIT: config.REDIS_ENCRYPTION_CACHE_REUSE_LIMIT,
    REDIS_ENCRYPTION_SUITE: config.REDIS_ENCRYPTION_SUITE || undefined,
    REDIS_ENCRYPTION_CONTEXT_TAG: config.REDIS_ENCRYPTION_CONTEXT_TAG || undefined,
    LOG_LEVEL: config.LOG_LEVEL || 'info',
    LOG_HEADERS: config.LOG_HEADERS || null,
    TRACE_REQUEST_HEADER_NAME: config.TRACE_REQUEST_HEADER_NAME || null,
    OUTBOUND_TRACE_REQUEST_HEADER_NAME: config.OUTBOUND_TRACE_REQUEST_HEADER_NAME || null,
    SESSION_COOKIE_NAME: config.SESSION_COOKIE_NAME || 'pcsessionid',
    HTTP_TIMEOUT: config.HTTP_TIMEOUT ? parseInt(config.HTTP_TIMEOUT, 10) : 10,
    ADDRESSSERVICE_API_ENDPOINT: config.ADDRESSSERVICE_API_ENDPOINT || null,
    CLAIMSERVICE_API_ENDPOINT: config.CLAIMSERVICE_API_ENDPOINT || null,
    GOOGLE_TAG_MANAGER_ID: config.GOOGLE_TAG_MANAGER_ID || null,
    GOOGLE_TAG_MANAGER_DOMAIN: config.GOOGLE_TAG_MANAGER_DOMAIN || null,
    ENABLE_CSP: config.ENABLE_CSP === 'true',
    CONTEXT_PATH: config.CONTEXT_PATH || '/',
    CONTEXT_PATH_PROXY: config.CONTEXT_PATH_PROXY || undefined,
    AWS_KMS_ENDPOINT: config.AWS_KMS_ENDPOINT || null,
  };

  if (!['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'].includes(parsed.LOG_LEVEL)) {
    throw new Error(`LOG_LEVEL must be one of: fatal, error, warn, info, debug, trace, silent. Given ${String(parsed.LOG_LEVEL)}`);
  }

  if (parsed.LOG_HEADERS && typeof parsed.LOG_HEADERS !== 'string') {
    throw new TypeError('LOG_HEADERS must be a comma-separated string');
  }
  parsed.LOG_HEADERS = parsed.LOG_HEADERS === null ? [] : String(parsed.LOG_HEADERS).toLowerCase().replace(/[^a-z0-9,-]/ig, '').split(',')
    .filter((e) => e !== '');

  if (parsed.TRACE_REQUEST_HEADER_NAME) {
    // Header name will be lowercase when looking up in `req.headers`
    parsed.TRACE_REQUEST_HEADER_NAME = String(parsed.TRACE_REQUEST_HEADER_NAME).toLowerCase();
  }

  if (parsed.OUTBOUND_TRACE_REQUEST_HEADER_NAME) {
    // Header name will remain case sensitive in case upstream service is
    // case sensitive
    parsed.OUTBOUND_TRACE_REQUEST_HEADER_NAME = String(parsed.OUTBOUND_TRACE_REQUEST_HEADER_NAME);
  }

  if (parsed.GOOGLE_TAG_MANAGER_ID) {
    parsed.GOOGLE_TAG_MANAGER_ID = String(parsed.GOOGLE_TAG_MANAGER_ID);

    if (!/^GTM-[A-Z0-9]{1,7}$/.test(parsed.GOOGLE_TAG_MANAGER_ID)) {
      throw new TypeError('GOOGLE_TAG_MANAGER_ID must be valid format');
    }
  }

  if (parsed.GOOGLE_TAG_MANAGER_DOMAIN) {
    parsed.GOOGLE_TAG_MANAGER_DOMAIN = String(parsed.GOOGLE_TAG_MANAGER_DOMAIN);

    // Must be valid domain name, but often starts with a leading .
    if (!/\.?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(parsed.GOOGLE_TAG_MANAGER_DOMAIN)) {
      throw new TypeError('GOOGLE_TAG_MANAGER_DOMAIN must be valid format');
    }
  }

  if (parsed.REDIS_HOSTS === null) {
    parsed.REDIS_HOSTS = [];
  } else if (typeof parsed.REDIS_HOSTS !== 'string') {
    throw new TypeError('REDIS_HOSTS must be a string');
  } else {
    parsed.REDIS_HOSTS = parsed.REDIS_HOSTS.split(',').map((host) => {
      try {
        // We're using `username` rather than `password` here purely because
        // that's the way URL() parses it, because the `host` will only contain
        // a password, rather than the `username:password` style
        const { username, hostname, port } = new URL(`dummy://${host}`);
        return { host: hostname, port, password: username || null };
      } catch (e) {
        process.stderr.write(e.message);
        return null;
      }
    }).filter((h) => (h !== null));
  }

  if (!['', 'local', 'kms'].includes(parsed.REDIS_ENCRYPTION_MODE)) {
    throw new SyntaxError('REDIS_ENCRYPTION_MODE must be one of <empty>, local or kms');
  }

  if (parsed.REDIS_ENCRYPTION_LOCAL_KEY !== undefined) {
    const localKey = Uint8Array.from(Buffer.from(parsed.REDIS_ENCRYPTION_LOCAL_KEY, 'base64'));
    if (localKey.byteLength !== 32) {
      throw new Error('REDIS_ENCRYPTION_LOCAL_KEY must be 32 bytes');
    }
    parsed.REDIS_ENCRYPTION_LOCAL_KEY = localKey;
  }

  if (parsed.REDIS_ENCRYPTION_MODE === 'kms') {
    if (!parsed.REDIS_ENCRYPTION_ARN) {
      throw new Error('REDIS_ENCRYPTION_ARN is required when using kms encryption');
    } else if (!parsed.REDIS_ENCRYPTION_ARN.match(/^arn:aws:kms:[a-z0-9-]+?:[0-9]+?:key\/[a-f0-9-]+$/)) {
      throw new SyntaxError('REDIS_ENCRYPTION_ARN must use full ARN format (arn:aws:kms:<region>:<accountid>:key/<uuid>)');
    }
  }

  parsed.REDIS_ENCRYPTION_CACHE_TTL = parseInt(config.REDIS_ENCRYPTION_CACHE_TTL || 30, 10);
  if (Number.isNaN(parsed.REDIS_ENCRYPTION_CACHE_TTL)) {
    throw new TypeError('REDIS_ENCRYPTION_CACHE_TTL must be an integer');
  } else if (
    parsed.REDIS_ENCRYPTION_CACHE_TTL < 0 || parsed.REDIS_ENCRYPTION_CACHE_TTL > 1800
  ) {
    throw new RangeError('REDIS_ENCRYPTION_CACHE_TTL must be between 0 and 1800');
  }

  parsed.REDIS_ENCRYPTION_CACHE_CAPACITY = parseInt(
    config.REDIS_ENCRYPTION_CACHE_CAPACITY || 100,
    10,
  );
  if (Number.isNaN(parsed.REDIS_ENCRYPTION_CACHE_CAPACITY)) {
    throw new TypeError('REDIS_ENCRYPTION_CACHE_CAPACITY must be an integer');
  } else if (
    parsed.REDIS_ENCRYPTION_CACHE_CAPACITY < 0
    || parsed.REDIS_ENCRYPTION_CACHE_CAPACITY > 10000
  ) {
    throw new RangeError('REDIS_ENCRYPTION_CACHE_CAPACITY must be between 0 and 10000');
  }

  parsed.REDIS_ENCRYPTION_CACHE_REUSE_LIMIT = parseInt(
    config.REDIS_ENCRYPTION_CACHE_REUSE_LIMIT || 100,
    10,
  );
  if (Number.isNaN(parsed.REDIS_ENCRYPTION_CACHE_REUSE_LIMIT)) {
    throw new TypeError('REDIS_ENCRYPTION_CACHE_REUSE_LIMIT must be an integer');
  } else if (
    parsed.REDIS_ENCRYPTION_CACHE_REUSE_LIMIT < 0
    || parsed.REDIS_ENCRYPTION_CACHE_REUSE_LIMIT > 10000
  ) {
    throw new RangeError('REDIS_ENCRYPTION_CACHE_REUSE_LIMIT must be between 0 and 10000');
  }

  if (config.REDIS_ENCRYPTION_SUITE) {
    parsed.REDIS_ENCRYPTION_SUITE = parseInt(config.REDIS_ENCRYPTION_SUITE, 10);
    if (Number.isNaN(parsed.REDIS_ENCRYPTION_SUITE)) {
      throw new TypeError('REDIS_ENCRYPTION_SUITE must be an integer');
    } else if (!validCipherSuiteIds.includes(parsed.REDIS_ENCRYPTION_SUITE)) {
      throw new ReferenceError('REDIS_ENCRYPTION_SUITE must be a valid suite ID');
    }
  }

  if (config.REDIS_ENCRYPTION_CONTEXT_TAG) {
    parsed.REDIS_ENCRYPTION_CONTEXT_TAG = String(config.REDIS_ENCRYPTION_CONTEXT_TAG);
  }

  if (parsed.AWS_KMS_ENDPOINT !== null && parsed.NODE_ENV !== 'development') {
    throw new Error('AWS_KMS_ENDPOINT xannot be defined in non-development environments');
  }

  if (typeof parsed.HTTP_TIMEOUT !== 'number' || Number.isNaN(parsed.HTTP_TIMEOUT)) {
    throw new TypeError(`HTTP_TIMEOUT must be a positive integer. Given ${String(config.HTTP_TIMEOUT)}`);
  }

  if (!parsed.DISABLE_SESSION_TTL_RESTRICTIONS) {
    if (parsed.SESSION_TTL > 3600 || parsed.SESSION_TTL < 60) {
      throw new RangeError('SESSION_TTL must be within the range 60 to 3600 seconds');
    }

    if (!parsed.DISABLE_SESSION_TTL_RESTRICTIONS && parsed.SESSION_TTL % 60 > 0) {
      throw new Error('SESSION_TTL must be a factor of 60');
    }
  }

  if (parsed.CONTEXT_PATH !== '/' && !parsed.CONTEXT_PATH.match(/^\/[a-z-/]+\/$/i)) {
    throw new SyntaxError('CONTEXT_PATH must have a leading and trailing slash');
  }

  if (parsed.CONTEXT_PATH_PROXY === undefined) {
    parsed.CONTEXT_PATH_PROXY = parsed.CONTEXT_PATH;
  }

  if (parsed.CONTEXT_PATH_PROXY !== '/' && !parsed.CONTEXT_PATH_PROXY.match(/^\/[a-z-/]+\/$/i)) {
    throw new SyntaxError('CONTEXT_PATH_PROXY must have a leading and trailing slash');
  }

  // if the CACHAIN has not been injected then it is likely that the app is being
  // run in the localhost or local docker env
  if (parsed.CACHAIN && typeof parsed.CACHAIN !== 'string') {
    throw new TypeError('CACHAIN must be a string.');
  }

  Object.freeze(parsed);

  // We need to write all this back to `process.env` because elsewhere in the
  // app `process.env` is being used directly
  Object.keys(parsed).forEach((k) => {
    if (parsed[k] !== null && parsed[k] !== undefined) {
      process.env[k] = parsed[k];
    }
  });

  return parsed;
};

module.exports = ConfigIngestor;
