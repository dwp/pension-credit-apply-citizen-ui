const sinon = require('sinon');
const chai = require('chai');
const { ValidationError } = require('@dwp/govuk-casa');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const postcodeHooks = require('../../../../definitions/hooks/common/postcode.js');

chai.use(require('sinon-chai'));

const { expect } = chai;
const stubLookup = sinon.stub().returns(Promise.resolve([]));
const stubAddressServiceFactory = {
  create: sinon.stub().returns({
    lookupByPostcode: stubLookup,
  }),
};

describe('Hooks: postcode', () => {
  beforeEach(() => {
    stubLookup.resetBehavior();
    stubLookup.returns(Promise.resolve([]));
  });

  it('should be an function', () => {
    expect(postcodeHooks).to.be.an.instanceOf(Function);
  });

  it('should have a prerender function', () => {
    const hooks = postcodeHooks(stubAddressServiceFactory);
    expect(hooks.prerender).to.be.an.instanceOf(Function);
  });

  it('should have a postvalidate function', () => {
    const hooks = postcodeHooks(stubAddressServiceFactory);
    expect(hooks.postvalidate).to.be.an.instanceOf(Function);
  });

  describe('prerender', () => {
    it('should add a "manualAddressUrl" template variable', () => {
      const hooks = postcodeHooks(stubAddressServiceFactory, 'test-waypoint');
      const req = new Request();
      const res = new Response(req);
      const next = sinon.stub();
      hooks.prerender(req, res, next);
      expect(res.locals).to.have.property('manualAddressUrl').that.equals('?skipto=test-waypoint');
      expect(next).to.be.calledOnceWithExactly();
    });

    it('should add default "pageTitleKey" template variable', () => {
      const hooks = postcodeHooks(stubAddressServiceFactory, 'test-waypoint');
      const req = new Request();
      const res = new Response(req);
      const next = sinon.stub();
      hooks.prerender(req, res, next);
      expect(res.locals).to.have.property('pageTitleKey').that.equals('postcode:pageTitle');
      expect(next).to.be.calledOnceWithExactly();
    });

    it('should add a "pageTitleKey" if passed into factory template variable', () => {
      const hooks = postcodeHooks(stubAddressServiceFactory, 'test-waypoint', 'testTitleKey');
      const req = new Request();
      const res = new Response(req);
      const next = sinon.stub();
      hooks.prerender(req, res, next);
      expect(res.locals).to.have.property('pageTitleKey').that.equals('postcode:testTitleKey');
      expect(next).to.be.calledOnceWithExactly();
    });
  });

  describe('postvalidate', () => {
    it('should call the address lookup service', async () => {
      const hooks = postcodeHooks(stubAddressServiceFactory);
      const req = new Request({
        'test-waypoint': {
          postcode: 'AB1 2CD',
        },
      });
      req.casa.journeyWaypointId = 'test-waypoint';
      const res = new Response(req);
      const next = sinon.stub();

      await hooks.postvalidate(req, res, next);
      expect(stubLookup).to.be.calledOnceWithExactly('AB1 2CD');
    });

    it('should respond with a validation error if no addresses were found', async () => {
      const hooks = postcodeHooks(stubAddressServiceFactory);
      const req = new Request();
      const res = new Response(req);
      const next = sinon.stub();

      await hooks.postvalidate(req, res, next);
      expect(next).to.be.calledOnceWithExactly({
        postcode: [
          sinon.match.instanceOf(ValidationError),
        ],
      });
    });

    it('should store found addresses, and a "lookup_attempted" flag in the page data', async () => {
      const hooks = postcodeHooks(stubAddressServiceFactory);
      stubLookup.resetBehavior();
      stubLookup.returns(Promise.resolve([{
        completeAddressLine: 'test-addr-1',
        postcode: 'test-postcode-1',
        uprn: 'test-uprn-1',
        superfluous_field: 'test1',
      }, {
        completeAddressLine: 'test-addr-2',
        postcode: 'test-postcode-2',
        uprn: 'test-uprn-2',
        superfluous_field: 'test2',
      }]));
      const req = new Request();
      req.casa.journeyWaypointId = 'test-waypoint';
      const res = new Response(req);
      const next = sinon.stub();

      await hooks.postvalidate(req, res, next);
      expect(next).to.be.calledOnceWithExactly();
      expect(req.casa.journeyContext.getDataForPage('test-waypoint')).to.eql({
        lookup_attempted: true,
        addresses: [{
          completeAddressLine: 'test-addr-1',
          postcode: 'test-postcode-1',
          uprn: 'test-uprn-1',
        }, {
          completeAddressLine: 'test-addr-2',
          postcode: 'test-postcode-2',
          uprn: 'test-uprn-2',
        }],
      });
    });

    it('should store empty addresses, and set a "lookup_attempted" flag to false in the page data when lookup fails', async () => {
      const hooks = postcodeHooks(stubAddressServiceFactory);
      stubLookup.resetBehavior();
      stubLookup.returns(Promise.reject(new Error('test-error')));
      const req = new Request();
      req.casa.journeyWaypointId = 'test-waypoint';
      const res = new Response(req);
      const next = sinon.stub();

      await hooks.postvalidate(req, res, next);
      expect(next).to.be.calledOnceWithExactly();
      expect(req.casa.journeyContext.getDataForPage('test-waypoint')).to.eql({
        lookup_attempted: true,
        addresses: [],
      });
    });

    it('should set a flag in session when lookup fails', async () => {
      const hooks = postcodeHooks(stubAddressServiceFactory);
      stubLookup.resetBehavior();
      stubLookup.returns(Promise.reject(new Error('test-error')));
      const req = new Request();
      const res = new Response(req);
      const next = sinon.stub();

      await hooks.postvalidate(req, res, next);
      expect(req.session).to.have.property('addressLookupFailed').that.equals(true);
    });
  });
});
