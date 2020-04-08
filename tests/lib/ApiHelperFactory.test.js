const { expect } = require('chai');

const ApiHelper = require('../../lib/ApiHelper.js');
const ApiHelperFactory = require('../../lib/ApiHelperFactory.js');

describe('ApiHelperFactory', () => {
  it('create() should return a ApiHelper', () => {
    const apiHelperFactory = new ApiHelperFactory();

    const apiHelper = apiHelperFactory.create();

    expect(apiHelper).to.be.an.instanceOf(ApiHelper);
  });
});
