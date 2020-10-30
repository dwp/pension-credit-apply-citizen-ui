const { expect } = require('chai');
const isoStringToDate = require('../../utils/iso-string-to-date.js');

describe('Utils: iso-string-to-date', () => {
  it('should export a function', () => {
    expect(isoStringToDate).to.be.a('function');
  });

  it('should return a date when given a date object', () => {
    expect(isoStringToDate('2019-01-01')).to.be.an.instanceOf(Date);
  });

  it('should parse date object as correct date', () => {
    expect(isoStringToDate('2019-01-01').getTime()).to.equal(new Date(2019, 0, 1).getTime());
  });

  it('should throw TypeError if does not receive object', () => {
    expect(() => isoStringToDate(123))
      .to.throw(TypeError, 'Expected string got number: 123');
  });

  it('should throw TypeError if string not in correct format', () => {
    expect(() => isoStringToDate('2019-1-1'))
      .to.throw(TypeError, 'String must be in the format YYYY-MM-DD got: 2019-1-1');
  });
});
