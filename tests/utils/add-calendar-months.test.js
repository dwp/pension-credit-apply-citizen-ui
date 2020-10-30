const { expect } = require('chai');
const addCalendarMonths = require('../../utils/add-calendar-months.js');

describe('Utils: add-calendar-months', () => {
  it('should retun a date', () => {
    const result = addCalendarMonths(new Date(), 1);
    expect(result).to.be.instanceOf(Date);
  });

  it('should add zero months', () => {
    const result = addCalendarMonths(new Date(2020, 5, 5), 0);
    expect(result).to.deep.equal(new Date(2020, 5, 5));
  });

  it('should add a month', () => {
    const result = addCalendarMonths(new Date(2020, 5, 5), 1);
    expect(result).to.deep.equal(new Date(2020, 6, 5));
  });

  it('should add six months', () => {
    const result = addCalendarMonths(new Date(2020, 2, 5), 6);
    expect(result).to.deep.equal(new Date(2020, 8, 5));
  });

  it('should add a calendar month (end of month to end of month)', () => {
    const result = addCalendarMonths(new Date(2020, 9, 31), 1);
    expect(result).to.deep.equal(new Date(2020, 10, 30));
  });

  it('should add calendar months over a year boundry', () => {
    const result = addCalendarMonths(new Date(2019, 9, 31), 6);
    expect(result).to.deep.equal(new Date(2020, 3, 30));
  });

  it('should add 12 months from a leap year', () => {
    const result = addCalendarMonths(new Date(2016, 1, 29), 12);
    expect(result).to.deep.equal(new Date(2017, 1, 28));
  });

  it('should throw if date is not a Date', () => {
    expect(() => addCalendarMonths(0, 1)).to.throw(TypeError, 'expected date to be a Date got number: 0');
  });

  it('should throw if months is not a number', () => {
    expect(() => addCalendarMonths(new Date(), true)).to.throw(TypeError, 'expected months to be a number got boolean: true');
  });

  it('should throw if months is NaN', () => {
    expect(() => addCalendarMonths(new Date(), NaN)).to.throw(TypeError, 'expected months to be a number got number: NaN');
  });
});
