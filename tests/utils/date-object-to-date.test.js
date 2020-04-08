const { expect } = require('chai');
const dateObjectToDate = require('../../utils/date-object-to-date.js');

describe('Utils: date-object-to-date', () => {
  it('should export a function', () => {
    expect(dateObjectToDate).to.be.a('function');
  });

  it('should return a date when given a date object', () => {
    expect(dateObjectToDate({
      yyyy: '2019',
      mm: '01',
      dd: '01',
    })).to.be.an.instanceOf(Date);
  });

  it('should parse date object as correct date', () => {
    expect(dateObjectToDate({
      yyyy: '2019',
      mm: '01',
      dd: '01',
    }).getTime()).to.equal(new Date(2019, 0, 1).getTime());
  });

  it('should throw TypeError if does not receive object', () => {
    expect(() => dateObjectToDate(123))
      .to.throw(TypeError, 'Expected object got number: 123');
  });

  it('should throw TypeError if object not in correct format', () => {
    expect(() => dateObjectToDate({
      aaaa: '2017',
      bb: '01',
      cc: '01',
    })).to.throw(TypeError, 'Expected date object got object: {"aaaa":"2017","bb":"01","cc":"01"}');
  });
});
