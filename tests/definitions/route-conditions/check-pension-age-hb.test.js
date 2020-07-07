const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const checkPAHB = require('../../../definitions/route-conditions/check-pension-age-hb.js');

describe('route-conditions/check-pension-age-hb', () => {
  const stubRoute = {};

  it('should be a function', () => {
    expect(checkPAHB).to.be.a('function');
  });

  it('should return a function', () => {
    expect(checkPAHB()).to.be.a('function');
  });

  describe('check for ineligibility', () => {
    const notEligibleForPAHB = checkPAHB('test', 'dateOfBirth', false);

    it('should throw an Error if the DOB is not a valid date', () => {
      const dateOfBirth = { yyyy: 'AAAA', mm: 'AA', dd: 'AA' };
      const context = new JourneyContext({ test: { dateOfBirth } });

      expect(() => notEligibleForPAHB(stubRoute, context)).to.throw(Error);
    });

    it('should return false if DOB has no page data', () => {
      const context = new JourneyContext({});

      return expect(notEligibleForPAHB(stubRoute, context)).to.be.false;
    });

    it('should return false if DOB data is empty object', () => {
      const context = new JourneyContext({ test: {} });

      return expect(notEligibleForPAHB(stubRoute, context)).to.be.false;
    });

    it('should return true if the user was born after 5 February 1954', () => {
      const dateOfBirth = { dd: '6', mm: '2', yyyy: '1954' };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(notEligibleForPAHB(stubRoute, context)).to.be.true;
    });

    it('should return false if the user was born on 5 February 1954', () => {
      const dateOfBirth = { dd: '5', mm: '2', yyyy: '1954' };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(notEligibleForPAHB(stubRoute, context)).to.be.false;
    });

    it('should return false if the user was born before 5 February 1954', () => {
      const dateOfBirth = { dd: '4', mm: '2', yyyy: '1954' };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(notEligibleForPAHB(stubRoute, context)).to.be.false;
    });

    it('should name returned route condition "bornAfter5Feb1954"', () => {
      expect(notEligibleForPAHB.name).to.equal('bornAfter5Feb1954');
    });
  });

  describe('check for eligibility', () => {
    const eligibleForPAHB = checkPAHB('test', 'dateOfBirth', true);

    it('should throw an Error if the DOB is not a valid date', () => {
      const dateOfBirth = { yyyy: 'AAAA', mm: 'AA', dd: 'AA' };
      const context = new JourneyContext({ test: { dateOfBirth } });

      expect(() => eligibleForPAHB(stubRoute, context)).to.throw(Error);
    });

    it('should return false if DOB has no page data', () => {
      const context = new JourneyContext({});

      return expect(eligibleForPAHB(stubRoute, context)).to.be.false;
    });

    it('should return false if DOB data is empty object', () => {
      const context = new JourneyContext({ test: {} });

      return expect(eligibleForPAHB(stubRoute, context)).to.be.false;
    });

    it('should return false if the user was born after 5 February 1954', () => {
      const dateOfBirth = { dd: '6', mm: '2', yyyy: '1954' };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(eligibleForPAHB(stubRoute, context)).to.be.false;
    });

    it('should return true if the user was born on 5 February 1954', () => {
      const dateOfBirth = { dd: '5', mm: '2', yyyy: '1954' };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(eligibleForPAHB(stubRoute, context)).to.be.true;
    });

    it('should return true if the user was born before 5 February 1954', () => {
      const dateOfBirth = { dd: '4', mm: '2', yyyy: '1954' };
      const context = new JourneyContext({ test: { dateOfBirth } });

      return expect(eligibleForPAHB(stubRoute, context)).to.be.true;
    });

    it('should name returned route condition "bornOnOrBefore5Feb1954"', () => {
      expect(eligibleForPAHB.name).to.equal('bornOnOrBefore5Feb1954');
    });
  });
});
