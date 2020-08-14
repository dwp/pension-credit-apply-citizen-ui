const privates = new WeakMap();

class ClaimService {
  /**
   * Create new instance of ClaimService.
   *
   * `args` is an object in the format:
   * {
   *   logger: <pino> An instance of the Pino logger (required),
   *   api: <function> HTTP API executor (usually bound instance of ApiHelper.send) (required)
   * }
   *
   * @param {Object} args Constructor args (see above)
   */
  constructor(args) {
    privates.set(this, {
      logger: args.logger,
      api: args.api,
    });
  }

  /**
   * Submit a claim to the backend service.
   *
   * @param {object} claim Claim data
   * @returns {Promise} HTTP request promise
   */
  async submitClaim(claim = {}) {
    const p = privates.get(this);

    if (Object.prototype.toString.call(claim) !== '[object Object]') {
      throw new TypeError('Claim must be an object');
    }

    p.logger.info('Requesting POST /claims');
    return p.api('claims', {
      json: claim,
      method: 'POST',
      responseType: 'json',
    });
  }
}

module.exports = ClaimService;
