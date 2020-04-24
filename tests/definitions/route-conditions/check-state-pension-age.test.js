const moment = require('moment');
const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const checkSPA = require('../../../definitions/route-conditions/check-state-pension-age.js');

describe('route-conditions/check-state-pension-age', () => {
  const stubRoute = {};

  let _now;

  beforeEach(() => {
    const date = moment('01-01-2000', 'DD-MM-YYYY').valueOf();
    _now = Date.now;
    Date.now = () => (date);
  });

  afterEach(() => {
    Date.now = _now;
  });

  it('should be a function', () => {
    expect(checkSPA).to.be.a('function');
  });

  it('should return a function', () => {
    expect(checkSPA()).to.be.a('function');
  });

  describe('check for ineligibility', () => {
    const underSPA = checkSPA('test', 'dateOfBirth', false);

    it('should throw an Error if the DOB is not a valid date', () => {
      const dateOfBirth = { yyyy: 'AAAA', mm: 'AA', dd: 'AA' };
      const context = new JourneyContext({ test: { dateOfBirth } });

      expect(() => underSPA(stubRoute, context)).to.throw(Error);
    });

    it('should return false if DOB has no page data', () => {
      const context = new JourneyContext({});

      return expect(underSPA(stubRoute, context)).to.be.false;
    });

    it('should return false if DOB data is empty object', () => {
      const context = new JourneyContext({ test: {} });

      return expect(underSPA(stubRoute, context)).to.be.false;
    });

    it('should return true if the user is too young (not yet reached SPA age)', () => {
      const d = moment().subtract('60', 'years');
      const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(underSPA(stubRoute, context)).to.be.true;
    });

    it('should return true if the user is too young (4 months prior to SPA age)', () => {
      const d = moment().subtract('65', 'years').add(4, 'months').add(1, 'day');
      const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(underSPA(stubRoute, context)).to.be.true;
    });

    it('should return false if the user has reached SPA age', () => {
      const d = moment().subtract('65', 'years');
      const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(underSPA(stubRoute, context)).to.be.false;
    });

    it('should return false if the user is within 4 months of their SPA age', () => {
      const d = moment().subtract('65', 'years').add(4, 'months');
      const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(underSPA(stubRoute, context)).to.be.false;
    });

    it('should name returned route condition "underStatePensionAge"', () => {
      expect(underSPA.name).to.equal('underStatePensionAge');
    });
  });

  describe('check for eligibility', () => {
    const atOrOverSPA = checkSPA('test', 'dateOfBirth', true);

    it('should throw an Error if the DOB is not a valid date', () => {
      const dateOfBirth = { yyyy: 'AAAA', mm: 'AA', dd: 'AA' };
      const context = new JourneyContext({ test: { dateOfBirth } });

      expect(() => atOrOverSPA(stubRoute, context)).to.throw(Error);
    });

    it('should return false if DOB has no page data', () => {
      const context = new JourneyContext({});

      return expect(atOrOverSPA(stubRoute, context)).to.be.false;
    });

    it('should return false if DOB data is empty object', () => {
      const context = new JourneyContext({ test: {} });

      return expect(atOrOverSPA(stubRoute, context)).to.be.false;
    });

    it('should return false if the user is too young (not yet reached SPA age)', () => {
      const d = moment().subtract('60', 'years');
      const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(atOrOverSPA(stubRoute, context)).to.be.false;
    });

    it('should return false if the user is too young (4 months prior to SPA age)', () => {
      const d = moment().subtract('65', 'years').add(4, 'months').add(1, 'day');
      const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(atOrOverSPA(stubRoute, context)).to.be.false;
    });

    it('should return true if the user has reached SPA age', () => {
      const d = moment().subtract('65', 'years');
      const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(atOrOverSPA(stubRoute, context)).to.be.true;
    });

    it('should return true if the user is within 4 months of their SPA age', () => {
      const d = moment().subtract('65', 'years').add(4, 'months');
      const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(atOrOverSPA(stubRoute, context)).to.be.true;
    });

    it('should name returned route condition "atOrOverStatePensionAge"', () => {
      expect(atOrOverSPA.name).to.equal('atOrOverStatePensionAge');
    });
  });
});
