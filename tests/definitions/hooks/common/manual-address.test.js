const sinon = require('sinon');
const chai = require('chai');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const { waypoints } = require('../../../../lib/constants.js');
const manualAddressHooks = require('../../../../definitions/hooks/common/manual-address.js');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Hooks: manual-address', () => {
  it('should be an object', () => {
    expect(manualAddressHooks('any-origin', 'any-waypoint')).to.be.an('object');
  });

  describe('prerender function', () => {
    it('should have a prerender function', () => {
      expect(manualAddressHooks('any-origin', 'any-waypoint').prerender).to.be.an.instanceOf(Function);
    });

    it('prerender should add addressLookupFailed=true to res.locals if set in session', () => {
      const req = new Request();
      const res = new Response(req);

      req.session.addressLookupFailed = true;

      manualAddressHooks('any-origin', 'any-waypoint').prerender(req, res, () => {});
      expect(res.locals.addressLookupFailed).to.equal(true);
    });

    it('prerender should unset addressLookupFailed in req.session', () => {
      const req = new Request();
      const res = new Response(req);

      req.session.addressLookupFailed = true;

      manualAddressHooks('any-origin', 'any-waypoint').prerender(req, res, () => {});
      expect(req.session.addressLookupFailed).to.equal(undefined);
    });

    it('prerender should set the res.locals.skipToRef to the address origin', () => {
      const req = new Request();
      const res = new Response(req);

      req.session.addressLookupFailed = true;

      manualAddressHooks('/test-mount/', 'any-origin', 'any-waypoint').prerender(req, res, () => {});

      expect(res.locals.manualUrl).to.eq('/test-mount/any-origin/any-waypoint');
    });

    it('prerender should call next', () => {
      const req = new Request();
      const res = new Response(req);
      const nextStub = sinon.stub();

      manualAddressHooks('any-origin', 'any-waypoint').prerender(req, res, nextStub);
      return expect(nextStub).to.be.calledOnce;
    });
  });

  describe('postvalidate function', () => {
    it('should have a postvalidate function', () => {
      expect(manualAddressHooks('any-origin', 'any-waypoint').postvalidate).to.be.an.instanceOf(Function);
    });

    it('postvalidate should call next', () => {
      const req = new Request({
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL]: {
          line1: '1 The Street',
          line2: 'Townville',
          postcode: 'AA0 0AA',
        },
      });
      const res = new Response(req);

      const nextStub = sinon.stub();

      manualAddressHooks('any-origin', 'any-waypoint').postvalidate(req, res, nextStub);
      return expect(nextStub).to.be.calledOnce;
    });

    it('should set the _selected-contact-address page data with the HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL data', () => {
      const req = new Request({
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL]: {
          line1: '1 (contact) The Street',
          line2: '(contact) Townville',
          postcode: 'AA1 1AA',
        },
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL]: {
          line1: '1 The Street',
          line2: 'Townville',
          postcode: 'AA0 0AA',
        },
      });
      const res = new Response(req);

      const nextStub = sinon.stub();

      manualAddressHooks('/test-mount/', 'any-origin', 'any-waypoint', waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN, waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL).postvalidate(req, res, nextStub);

      const addressData = req.casa.journeyContext.getDataForPage(
        waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN,
      );

      expect(addressData).to.be.an('object');
      expect(addressData.addressFrom).to.equal('manual');
      /* eslint-disable-next-line max-len */
      expect(addressData.address).to.deep.eql(req.casa.journeyContext.getDataForPage(waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL));
    });

    it('should set the _selected-contact-address page data with the HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL data', () => {
      const req = new Request({
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL]: {
          line1: '1 The Street',
          line2: 'Townville',
          postcode: 'AA1 1AA',
        },
        [waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL]: {
          line1: '1 (home) The Street',
          line2: '(home) Townville',
          postcode: 'AA0 0AA',
        },
      });
      const res = new Response(req);

      const nextStub = sinon.stub();

      manualAddressHooks('/test-mount/', 'any-origin', 'any-waypoint', waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN, waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL).postvalidate(req, res, nextStub);

      const addressData = req.casa.journeyContext.getDataForPage(
        waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN,
      );

      expect(addressData).to.be.an('object');
      expect(addressData.addressFrom).to.equal('manual');
      /* eslint-disable-next-line max-len */
      expect(addressData.address).to.deep.eql(req.casa.journeyContext.getDataForPage(waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL));
    });
  });
});
