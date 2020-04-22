const ClaimService = require('./ClaimService.js');

const privates = new WeakMap();

class ClaimServiceFactory {
  /**
   * @param {ApiHelperFactory} apiHelperFactory Instance generator
   */
  constructor(apiHelperFactory) {
    privates.set(this, {
      apiHelperFactory,
    });
  }

  /**
   * `options` - see ClaimService constructor parameters. The `logger` and
   * `traceId` options are used to create an APIHelper instance.
   *
   * @param {Object} options Instantiation options
   * @returns {ClaimService} A ClaimService instance
   */
  create(options = {}) {
    const self = privates.get(this);
    const apiHelper = self.apiHelperFactory.create({
      logger: options.logger,
      traceId: options.traceId,
    });
    return new ClaimService({
      logger: options.logger,
      api: apiHelper.send.bind(apiHelper),
    });
  }
}

module.exports = ClaimServiceFactory;
