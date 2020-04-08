const ApiHelper = require('./ApiHelper.js');

const privates = new WeakMap();

class ApiHelperFactory {
  /**
   * `baseOptions` - See ApiHelper for constructor parameters.
   *
   * @param {Object} baseOptions Base options for instance instantiation
   */
  constructor(baseOptions = {}) {
    privates.set(this, baseOptions);
  }

  /**
   * Create a new instance of ApiHelper.
   *
   * `options` - See ApiHelper for constructor parameters.
   *
   * @param {Object} options Instantiation options
   * @returns {ApiHelper} Instantiatied instance
   */
  create(options = {}) {
    return new ApiHelper(Object.assign(privates.get(this), {
      ...options,
    }));
  }
}

module.exports = ApiHelperFactory;
