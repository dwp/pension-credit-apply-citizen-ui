const { expect } = require('chai');

const AddressService = require('../../lib/AddressService.js');
const ApiHelperFactory = require('../../lib/ApiHelperFactory.js');
const AddressServiceFactory = require('../../lib/AddressServiceFactory.js');

describe('AddressServiceFactory', () => {
  it('create() should return a AddressService', () => {
    const addressServiceFactory = new AddressServiceFactory(new ApiHelperFactory());

    const addressService = addressServiceFactory.create();

    expect(addressService).to.be.an.instanceOf(AddressService);
  });
});
