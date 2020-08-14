const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

const { expect } = chai;

const AddressService = require('../../lib/AddressService.js');
const fakeLogger = require('../helpers/fake-logger.js')();

describe('AddressService', () => {
  describe('lookupAddresses()', () => {
    it('should GET addresses from address service', () => {
      const apiStub = sinon.stub().returns(Promise.resolve([
        {
          postcode: 'AA11 A1A',
          address: '123 FAKE STREET, AA11 A1A',
        },
      ]));
      const addressService = new AddressService({
        logger: fakeLogger,
        api: apiStub,
      });
      const postcode = 'AA11 A1A';
      addressService.lookupByPostcode(postcode);

      expect(apiStub).to.be.calledOnceWith('lookup/postcode', {
        searchParams: { postcode },
        method: 'GET',
        responseType: 'json',
      });
    });

    it('should reject if given a postcode containing invalid characters', () => {
      const addressService = new AddressService({
        logger: fakeLogger,
      });

      return expect(addressService.lookupByPostcode('bad,postcode')).to.be.rejectedWith(SyntaxError, 'Postcode contains invalid characters');
    });
  });

  describe('getByUPRN()', () => {
    it('should GET an address from address service', () => {
      const apiStub = sinon.stub().returns(Promise.resolve({
        uprn: '1',
        postcode: 'AA11 A1A',
        address: '123 FAKE STREET, AA11 A1A',
      }));
      const addressService = new AddressService({
        logger: fakeLogger,
        api: apiStub,
      });
      const uprn = '1';
      addressService.getByUPRN(uprn);

      expect(apiStub).to.be.calledOnceWith(`lookup/uprn/${uprn}`, {
        method: 'GET',
        responseType: 'json',
      });
    });

    it('should reject if given a uprn containing invalid characters', () => {
      const addressService = new AddressService({
        logger: fakeLogger,
      });

      return expect(addressService.getByUPRN('1234bad')).to.be.rejectedWith(SyntaxError, 'UPRN contains invalid characters');
    });
  });
});
