const { expect } = require('chai');
const dateToDateObject = require('../../utils/date-to-date-object.js');

describe('Utils: date-to-date-object', () => {
  it('should export a function', () => {
    expect(dateToDateObject).to.be.a('function');
  });

  it('should return an object when given a date', () => {
    expect(dateToDateObject(new Date())).to.be.instanceOf(Object);
  });

  it('should return correct date object', () => {
    expect(dateToDateObject(new Date('2019-12-31'))).to.deep.equal({
      yyyy: '2019',
      mm: '12',
      dd: '31',
    });
  });

  it('should return date object with leading zeros', () => {
    expect(dateToDateObject(new Date('2019-01-01'))).to.deep.equal({
      yyyy: '2019',
      mm: '01',
      dd: '01',
    });
  });

  it('should throw TypeError if does not receive date', () => {
    expect(() => dateToDateObject(123))
      .to.throw(TypeError, 'Expected Date got number: 123');
  });
});
