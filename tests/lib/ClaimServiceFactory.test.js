const { expect } = require('chai');

const ClaimService = require('../../lib/ClaimService.js');
const ApiHelperFactory = require('../../lib/ApiHelperFactory.js');
const ClaimServiceFactory = require('../../lib/ClaimServiceFactory.js');

describe('ClaimServiceFactory', () => {
  it('create() should return a ClaimService', () => {
    const claimServiceFactory = new ClaimServiceFactory(new ApiHelperFactory());

    const claimService = claimServiceFactory.create();

    expect(claimService).to.be.an.instanceOf(ClaimService);
  });
});
