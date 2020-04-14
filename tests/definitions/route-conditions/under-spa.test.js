const moment = require('moment');
const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../lib/constants.js');
const router = require('../../../definitions/route-conditions/under-spa.js');

const underSPA = router(WP);

describe('route-conditions/under-spa', () => {
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

  it('should return a function', () => {
    expect(router({})).to.be.a('function');
  });

  it('should throw an Error if the DOB is not a valid date', () => {
    const dateOfBirth = { yyyy: 'AAAA', mm: 'AA', dd: 'AA' };
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: { dateOfBirth } });

    expect(() => underSPA(stubRoute, context)).to.throw(Error);
  });

  it('should return true if DOB has no page data', () => {
    const context = new JourneyContext({});

    return expect(underSPA(stubRoute, context)).to.be.true;
  });

  it('should return true if DOB data is empty object', () => {
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: {} });

    return expect(underSPA(stubRoute, context)).to.be.true;
  });

  it('should return true if the user is too young (not yet reached SPA age)', () => {
    const d = moment().subtract('60', 'years');
    const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: { dateOfBirth } });

    return expect(underSPA(stubRoute, context)).to.be.true;
  });

  it('should return true if the user is too young (4 months prior to SPA age)', () => {
    const d = moment().subtract('65', 'years').add(4, 'months').add(1, 'day');
    const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: { dateOfBirth } });

    return expect(underSPA(stubRoute, context)).to.be.true;
  });

  it('should return false if the user has reach SPA age', () => {
    const d = moment().subtract('65', 'years');
    const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: { dateOfBirth } });

    return expect(underSPA(stubRoute, context)).to.be.false;
  });

  it('should return false if the user is within 4 months of their SPA age', () => {
    const d = moment().subtract('65', 'years').add(4, 'months');
    const dateOfBirth = { dd: d.format('DD'), mm: d.format('MM'), yyyy: d.format('YYYY') };
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: { dateOfBirth } });

    return expect(underSPA(stubRoute, context)).to.be.false;
  });
});
