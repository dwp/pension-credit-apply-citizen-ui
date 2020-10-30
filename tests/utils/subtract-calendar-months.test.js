const { expect } = require('chai');
const subtractCalendarMonths = require('../../utils/subtract-calendar-months.js');

describe('Utils: subtract-calendar-months', () => {
  it('should retun a date', () => {
    const result = subtractCalendarMonths(new Date(), 1);
    expect(result).to.be.instanceOf(Date);
  });

  it('should subtract zero months', () => {
    const result = subtractCalendarMonths(new Date(2020, 5, 5), 0);
    expect(result).to.deep.equal(new Date(2020, 5, 5));
  });

  it('should subtract a month', () => {
    const result = subtractCalendarMonths(new Date(2020, 5, 5), 1);
    expect(result).to.deep.equal(new Date(2020, 4, 5));
  });

  it('should subtract six months', () => {
    const result = subtractCalendarMonths(new Date(2020, 8, 5), 6);
    expect(result).to.deep.equal(new Date(2020, 2, 5));
  });

  it('should subtract a calendar month (end of month to end of month)', () => {
    const result = subtractCalendarMonths(new Date(2020, 9, 31), 1);
    expect(result).to.deep.equal(new Date(2020, 8, 30));
  });

  it('should subtract calendar months over a year boundry', () => {
    const result = subtractCalendarMonths(new Date(2020, 0, 31), 2);
    expect(result).to.deep.equal(new Date(2019, 10, 30));
  });

  it('should subtract 12 months from a leap year', () => {
    const result = subtractCalendarMonths(new Date(2020, 1, 29), 12);
    expect(result).to.deep.equal(new Date(2019, 1, 28));
  });

  it('should throw if date is not a Date', () => {
    expect(() => subtractCalendarMonths(0, 1)).to.throw(TypeError, 'expected date to be a Date got number: 0');
  });

  it('should throw if months is not a number', () => {
    expect(() => subtractCalendarMonths(new Date(), true)).to.throw(TypeError, 'expected months to be a number got boolean: true');
  });

  it('should throw if months is NaN', () => {
    expect(() => subtractCalendarMonths(new Date(), NaN)).to.throw(TypeError, 'expected months to be a number got number: NaN');
  });
});
