const sinon = require('sinon');
const { expect } = require('chai').use(require('sinon-chai'));
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const start = require('../../../../definitions/hooks/eligibility/start.js');

describe('Hooks: eligibility/start', () => {
  let _now;

  beforeEach(() => {
    const date = new Date(2020, 0, 10);
    _now = Date.now;
    Date.now = () => (date);
  });

  afterEach(() => {
    Date.now = _now;
  });

  it('should export a function', () => {
    expect(start).to.be.a('function');
  });

  it('should return a object with prerender and postvalidate functions', () => {
    const startHooks = start();
    expect(startHooks).to.be.an('object');
    expect(startHooks).to.have.property('prerender').that.is.a('function');
    expect(startHooks).to.have.property('postvalidate').that.is.a('function');
  });

  describe('prerender', () => {
    it('should add sessionMinutes template var as sessionTtl / 60', () => {
      const req = new Request();
      const res = new Response(req);
      const { prerender } = start(60);

      prerender(req, res, () => {});

      expect(res.locals).to.have.property('sessionMinutes').that.equals(1);
    });

    it('should call next', (done) => {
      const req = new Request();
      const res = new Response(req);
      const { prerender } = start(60);

      prerender(req, res, done);
    });
  });

  describe('postvalidate', () => {
    it('should add applicationDate to START page data', () => {
      const req = new Request();
      const res = new Response(req);
      const { postvalidate } = start(60, 'start');

      postvalidate(req, res, () => {});

      const startData = req.casa.journeyContext.getDataForPage('start');
      expect(startData).to.have.property('applicationDate').that.equals('2020-01-10');
    });

    it('should save session when adding applicationDate to START page data', () => {
      const req = new Request();
      const res = new Response(req);
      const next = () => {};
      const { postvalidate } = start(60, 'start');

      req.session = { save: sinon.stub() };

      postvalidate(req, res, next);
      expect(req.session.save).to.be.calledWith(next);
    });

    it('should not overwrite first instance of applicationDate', () => {
      const req = new Request();
      const res = new Response(req);
      const { postvalidate } = start(60, 'start');

      postvalidate(req, res, () => {});
      const startData = req.casa.journeyContext.getDataForPage('start');
      expect(startData).to.have.property('applicationDate').that.equals('2020-01-10');

      Date.now = () => new Date(2020, 9, 20);

      postvalidate(req, res, () => {});
      const startData2 = req.casa.journeyContext.getDataForPage('start');
      expect(startData2).to.have.property('applicationDate').that.equals('2020-01-10');
    });

    it('should still call next if applicationDate is already set', () => {
      const req = new Request();
      const res = new Response(req);
      const { postvalidate } = start(60, 'start');

      postvalidate(req, res, () => {});

      const next = sinon.stub();
      postvalidate(req, res, next);
      return expect(next).to.be.called;
    });
  });
});
