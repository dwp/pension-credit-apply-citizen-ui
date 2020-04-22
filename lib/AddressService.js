const privates = new WeakMap();

class AddressService {
  /**
   * Create new instance of AddressService.
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
   * Get a list of addresses by postcode.
   *
   * @param {String} postcode Postcode string to lookup matching addresses
   * @returns {Promise} HTTP request promise
   */
  async lookupByPostcode(postcode) {
    const p = privates.get(this);

    p.logger.info(`Requesting GET /lookup/postcode?postcode=${postcode}`);
    return p.api('lookup/postcode', {
      searchParams: { postcode },
      method: 'GET',
      responseType: 'json',
    }).then((r) => (r.body));
  }

  /**
   * Get an address by UPRN.
   *
   * @param {String} uprn UPRN string to get matching address
   * @returns {Promise} HTTP request promise
   */
  async getByUPRN(uprn) {
    const p = privates.get(this);
    p.logger.info(`Requesting GET /lookup/uprn?uprn=${uprn}`);
    return p.api(`lookup/uprn/${uprn}`, {
      method: 'GET',
      responseType: 'json',
    }).then((r) => (r.body));
  }
}

module.exports = AddressService;
