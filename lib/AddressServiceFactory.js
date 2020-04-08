const AddressService = require('./AddressService.js');

const privates = new WeakMap();

class AddressServiceFactory {
  /**
   * @param {ApiHelperFactory} apiHelperFactory Instance generator
   */
  constructor(apiHelperFactory) {
    privates.set(this, {
      apiHelperFactory,
    });
  }

  /**
   * `options` - see AddressService constructor parameters. The `logger` and
   * `traceId` options are used to create an APIHelper instance.
   *
   * @param {Object} options Instantiation options
   * @returns {AddressService} A AddressService instance
   */
  create(options = {}) {
    const self = privates.get(this);
    const apiHelper = self.apiHelperFactory.create({
      logger: options.logger,
      traceId: options.traceId,
    });
    return new AddressService({
      logger: options.logger,
      api: apiHelper.send.bind(apiHelper),
    });
  }
}

module.exports = AddressServiceFactory;
