const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints } = require('../../lib/constants.js');
const needToBackdate = require('../../utils/need-to-backdate.js');

describe('Utils: need-to-backdate', () => {
  let _now;

  before(() => {
    _now = Date.now;
    Date.now = () => (1580204913690); // 2020-01-28
  });

  after(() => {
    Date.now = _now;
  });

  it('should export a function', () => {
    expect(needToBackdate).to.be.a('function');
  });

  it('should return an boolean', () => {
    const context = new JourneyContext({});
    const dates = needToBackdate(context);

    expect(dates).to.be.an('boolean');
  });

  it('should return true if dateOfClaim is more than 7 days before today', () => {
    const context = new JourneyContext({
      [waypoints.DATE_OF_CLAIM]: {
        dateOfClaim: { dd: '20', mm: '01', yyyy: '2020' },
      },
    });

    expect(needToBackdate(context)).to.equal(true);
  });

  it('should return false if dateOfClaim is 7 days before today', () => {
    const context = new JourneyContext({
      [waypoints.ENTER_DATE_OF_CLAIM]: {
        dateOfClaim: { dd: '21', mm: '01', yyyy: '2020' },
      },
    });

    expect(needToBackdate(context)).to.equal(false);
  });

  it('should return false if dateOfClaim is less than 7 days before today', () => {
    const context = new JourneyContext({
      [waypoints.ENTER_DATE_OF_CLAIM]: {
        dateOfClaim: { dd: '20', mm: '01', yyyy: '2020' },
      },
    });

    expect(needToBackdate(context)).to.equal(false);
  });

  it('should return false if dateOfClaim is today', () => {
    const context = new JourneyContext({
      [waypoints.ENTER_DATE_OF_CLAIM]: {
        dateOfClaim: { dd: '28', mm: '01', yyyy: '2020' },
      },
    });

    expect(needToBackdate(context)).to.equal(false);
  });

  it('should return false if dateOfClaim is in the future', () => {
    const context = new JourneyContext({
      [waypoints.ENTER_DATE_OF_CLAIM]: {
        dateOfClaim: { dd: '29', mm: '01', yyyy: '2020' },
      },
    });

    expect(needToBackdate(context)).to.equal(false);
  });
});
