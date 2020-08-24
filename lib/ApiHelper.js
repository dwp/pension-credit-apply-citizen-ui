const got = require('got');
const { name, version } = require('../package.json');

const privates = new WeakMap();

class ApiHelper {
  /**
   * Create new instance of ApiHelper.
   *
   * `args` is an object in the format:
   * {
   *   logger: <pino> An instance of the Pino logger (required),
   *   dnsLookupHostname: <string> Service lookup queries (SRV) will be sent to this host (optional)
   *   dnsLookupTimeout: <int> No. seconds to wait until lookup is timed out (default 10) (optional)
   *   httpTimeout: <int> No. seconds between connection retries (default 10) (optional)
   *   prefixUrl: <string> Base URL of the service to be called (e.g. https://localhost/api/v1) (required)
   *   traceId: <string> Value of the trace-id header assigned to the request object (optional)
   *   traceRequestHeaderName: <string> Name of the trace-id header (optional)
   *   cachain: <string> The public certificate(s) to access RBAC CA
   * }
   *
   * @param {Object} args Arguments
   */
  constructor(args) {
    if (Object.prototype.hasOwnProperty.call(args, 'httpTimeout')) {
      if (typeof args.httpTimeout !== 'number') {
        throw new TypeError('httpTimeout must be a number');
      }
      if (args.httpTimeout < 1 || args.httpTimeout > 60) {
        throw new RangeError('httpTimeout must be between 1 and 60 seconds');
      }
    }

    privates.set(this, {
      logger: args.logger || null,
      traceId: args.traceId || null,
      httpTimeout: parseInt(args.httpTimeout || 10, 10) * 1000,
      traceRequestHeaderName: args.traceRequestHeaderName || 'X-Request-Id',
      prefixUrl: args.prefixUrl,
      cachain: args.cachain || null,
    });
  }

  /**
   * Send a request to the service.
   *
   * @param {string} url URL to call on top of the underlying base service URL
   * @param {Object} options Option got "got" http request library
   * @returns {Promise} Pending response
   */
  async send(url, options) {
    const self = privates.get(this);

    // Set default headers
    const headers = {
      ...(options && options.headers),
      'user-agent': `${name}:${version}`,
      [self.traceRequestHeaderName]: self.traceId,
    };

    // Merge passed options with defaults
    const opts = Object.assign(Object.create(null), {
      prefixUrl: self.prefixUrl,
      headers,
      timeout: self.httpTimeout,
      https: {
        rejectUnauthorized: String(process.env.NODE_TLS_REJECT_UNAUTHORIZED) !== '0',
      },
    }, options);

    // Avoid assigning certificateAuthority to null which causes an error.
    // Overrides the default Certificate Authorities.
    if (self.cachain) {
      opts.https.certificateAuthority = self.cachain;
    }

    self.logger.info({}, `Making API call to: ${self.prefixUrl}/${url}`);

    // Do HTTP request with got
    self.logger.info('Submitting request');

    return got(url, opts);
  }
}

module.exports = ApiHelper;
