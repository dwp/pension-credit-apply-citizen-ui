const ConfigIngestor = (config = {}) => {
  const parsed = {
    PORT: config.PORT ? parseInt(config.PORT, 10) : null,
    USE_TLS: config.USE_TLS === 'true',
    TLS_CERT: config.TLS_CERT || null,
    TLS_KEY: config.TLS_KEY || null,
    CACHAIN: config.CACHAIN || null,
    SESSION_SECRET: config.SESSION_SECRET || 'SuperSecretSecret',
    SESSION_TTL: parseInt(config.SESSION_TTL || 1800, 10),
    REDIS_HOSTS: config.REDIS_HOSTS || null,
    REDIS_CLUSTER_MODE: config.REDIS_CLUSTER_MODE === 'true',
    LOG_LEVEL: config.LOG_LEVEL || 'info',
    TRACE_REQUEST_HEADER_NAME: config.TRACE_REQUEST_HEADER_NAME || null,
    OUTBOUND_TRACE_REQUEST_HEADER_NAME: config.OUTBOUND_TRACE_REQUEST_HEADER_NAME || null,
    SESSION_COOKIE_NAME: config.SESSION_COOKIE_NAME || 'pcsessionid',
    HTTP_TIMEOUT: config.HTTP_TIMEOUT ? parseInt(config.HTTP_TIMEOUT, 10) : 10,
    ADDRESSSERVICE_API_ENDPOINT: config.ADDRESSSERVICE_API_ENDPOINT || null,
    GOOGLE_TAG_MANAGER_ID: config.GOOGLE_TAG_MANAGER_ID || null,
    ENABLE_CSP: config.ENABLE_CSP === 'true',
    CONTEXT_PATH: config.CONTEXT_PATH || '/',
  };

  if (!['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'].includes(parsed.LOG_LEVEL)) {
    throw new ReferenceError(`LOG_LEVEL must be one of: fatal, error, warn, info, debug, trace, silent. Given ${String(parsed.LOG_LEVEL)}`);
  }

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

  if (typeof parsed.HTTP_TIMEOUT !== 'number' || Number.isNaN(parsed.HTTP_TIMEOUT)) {
    throw new TypeError(`HTTP_TIMEOUT must be a positive integer. Given ${String(config.HTTP_TIMEOUT)}`);
  }

  if (parsed.SESSION_TTL > 3600 || parsed.SESSION_TTL < 30) {
    throw new RangeError('SESSION_TTL must be within the range 30 to 3600 seconds');
  }

  if (parsed.CONTEXT_PATH !== '/' && !parsed.CONTEXT_PATH.match(/^\/[a-z-]+\/$/i)) {
    throw new SyntaxError('CONTEXT_PATH must have a leading and trailing slash');
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
    if (parsed[k] !== null) {
      process.env[k] = parsed[k];
    }
  });

  return parsed;
};

module.exports = ConfigIngestor;
