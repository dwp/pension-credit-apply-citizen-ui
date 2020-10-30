const { expect } = require('chai');
const getTodayDate = require('../../utils/get-today-date.js');

describe('Utils: get-today-date', () => {
  let _now;

  beforeEach(() => {
    const date = new Date(2020, 0, 1, 10, 10, 10, 100);
    _now = Date.now;
    Date.now = () => (date);
  });

  afterEach(() => {
    Date.now = _now;
  });

  it('should export a function', () => {
    expect(getTodayDate).to.be.a('function');
  });

  it('should return a date when given a date object', () => {
    expect(getTodayDate()).to.be.an.instanceOf(Date);
  });

  it('should return today date with no time', () => {
    expect(getTodayDate().getTime()).to.equal(new Date(2020, 0, 1).getTime());
  });
});
