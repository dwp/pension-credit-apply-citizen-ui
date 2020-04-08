const { expect } = require('chai');
const dateObjectToISOString = require('../../utils/date-object-to-iso-string.js');

describe('Utils: date-object-to-iso-string', () => {
  it('should export a function', () => {
    expect(dateObjectToISOString).to.be.a('function');
  });

  it('should return a string when given a date object', () => {
    expect(dateObjectToISOString({
      yyyy: '2019',
      mm: '01',
      dd: '01',
    })).to.be.a('string');
  });

  it('should format date object as string', () => {
    expect(dateObjectToISOString({
      yyyy: '2019',
      mm: '01',
      dd: '01',
    })).to.equal('2019-01-01');
  });

  it('should format string with leading zeros', () => {
    expect(dateObjectToISOString({
      yyyy: '2019',
      mm: '1',
      dd: '1',
    })).to.equal('2019-01-01');
  });

  it('should throw TypeError if does not receive object', () => {
    expect(() => dateObjectToISOString(123))
      .to.throw(TypeError, 'Expected object got number: 123');
  });

  it('should throw TypeError if object not in correct format', () => {
    expect(() => dateObjectToISOString({
      aaaa: '2017',
      bb: '01',
      cc: '01',
    })).to.throw(TypeError, 'Expected date object got object: {"aaaa":"2017","bb":"01","cc":"01"}');
  });
});
