const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));

const { expect } = chai;

const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const { waypoints } = require('../../../../lib/constants.js');
const selectAddressHooks = require('../../../../definitions/hooks/common/select-address.js');

/* ---------------------------------- Setup AddressService stub/mock components */
const testAddressData = {
  uprn: 1,
  buildingNumber: '123',
  thoroughfareName: 'FAKE STREET',
  townName: 'FAUXVILLE',
  postcode: 'AA0 0AA',
  completeAddressLine: '123 FAKE STREET, FAUXVILLE, AA0 0AA',
};

/* -------------------------------------------------------------------- Tests */

describe('Hooks: select-address', () => {
  it('should be an object', () => {
    expect(selectAddressHooks).to.be.an.instanceOf(Function);
  });

  describe('prerender function', () => {
    it('should have a prerender function', () => {
      const hooks = selectAddressHooks();
      expect(hooks.prerender).to.be.an.instanceOf(Function);
    });

    it('should set a template variable containing the first address postcode', () => {
      const req = new Request({
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP]: {
          addresses: [testAddressData],
        },
      });
      const res = new Response(req);
      const next = sinon.stub();
      const hooks = selectAddressHooks(waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP);

      hooks.prerender(req, res, next);
      expect(res.locals).to.have.property('postcode').that.equals('AA0 0AA');
    });

    it('should set a template variable containing a link to change the postcode', () => {
      const req = new Request({
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP]: {
          addresses: [testAddressData],
        },
      });
      const res = new Response(req);
      const next = sinon.stub();
      const hooks = selectAddressHooks(waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP);

      hooks.prerender(req, res, next);
      expect(res.locals).to.have.property('changePostcodeUrl').that.equals(`${waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP}#f-postcode`);
    });

    it('should set a template variable containing a link to change the address manually', () => {
      const req = new Request({
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP]: {
          addresses: [testAddressData],
        },
      });
      const res = new Response(req);
      const next = sinon.stub();
      const hooks = selectAddressHooks(
        waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
        waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL,
      );

      hooks.prerender(req, res, next);
      expect(res.locals).to.have.property('manualAddressUrl').that.equals(`?skipto=${waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL}`);
    });

    it('should format all addresses into an object with value, text and selected properties', () => {
      const req = new Request({
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP]: {
          addresses: [testAddressData, {
            uprn: 2,
            buildingNumber: 'test-number',
            thoroughfareName: 'test-street',
            townName: 'test-town',
            postcode: 'test-postcode',
            completeAddressLine: 'test-street, test-town, test-postcode',
          }],
        },
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT]: {
          uprn: 1,
        },
      });
      req.casa.journeyWaypointId = waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT;
      const res = new Response(req);
      const next = sinon.stub();
      const hooks = selectAddressHooks(
        waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
        waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL,
      );

      hooks.prerender(req, res, next);
      expect(res.locals).to.have.property('addresses').that.eql([{
        text: 'select-address:field.address.addressFound:2',
        value: 'select-address',
      }, {
        selected: true,
        text: '123 FAKE STREET, FAUXVILLE',
        value: 1,
      }, {
        selected: false,
        text: 'test-street, test-town, test-postcode',
        value: 2,
      }]);
    });

    it('should set the res.locals.postcode to [] as the addresses = [] due to no data from the postcode waypoint', () => {
      const req = new Request({
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP]: {},
      });
      const res = new Response(req);
      const next = sinon.stub();
      const hooks = selectAddressHooks(waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP);

      hooks.prerender(req, res, next);
      expect(res.locals).to.have.property('postcode').that.equals('');
    });
  });

  describe('postvalidate function', () => {
    it('should have a postvalidate function', () => {
      const hooks = selectAddressHooks();
      expect(hooks.postvalidate).to.be.an.instanceOf(Function);
    });

    it('should set the matching address from HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP page by uprn format as object and add to HIDDEN_ADDRESS_PAGE', () => {
      const req = new Request({
        'any-postcode': {
          addresses: [{
            uprn: 1,
            completeAddressLine: '123 WRONG STREET, WRONG TOWN, FA33 1FA',
            postcode: 'FA33 1FA',
          }, {
            uprn: 2,
            completeAddressLine: '123 TEST STREET, TEST TOWN, FA33 1FA',
            postcode: 'FA33 1FA',
          }],
        },
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT]: {
          uprn: 2,
        },
      });
      const res = new Response(req);

      const nextStub = sinon.stub();

      selectAddressHooks(
        'any-postcode',
        'any-waypoint',
        waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN,
        waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT,
      ).postvalidate(req, res, nextStub);

      const addressData = req.casa.journeyContext.getDataForPage(
        waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN,
      );

      expect(addressData).to.be.an('object');
      expect(addressData.addressFrom).to.equal('select');
      expect(addressData.uprn).to.equal(2);
      expect(addressData.address).to.deep.equal({
        line1: '123 TEST STREET',
        line2: 'TEST TOWN',
        postcode: 'FA33 1FA',
      });
    });
  });
});
