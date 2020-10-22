const { expect } = require('chai');
const dateToISOString = require('../../utils/date-to-iso-string.js');

describe('Utils: date-to-iso-string', () => {
  it('should export a function', () => {
    expect(dateToISOString).to.be.a('function');
  });

  it('should return a string when given a date', () => {
    expect(dateToISOString(new Date())).to.be.a('string');
  });

  it('should format date as ISO string', () => {
    expect(dateToISOString(new Date(2020, 10, 10))).to.equal('2020-11-10');
  });

  it('should format date as ISO string', () => {
    expect(dateToISOString(new Date(2020, 0, 1))).to.equal('2020-01-01');
  });

  it('should throw TypeError if does not receive date', () => {
    expect(() => dateToISOString(123))
      .to.throw(TypeError, 'Expected Date got number: 123');
  });
});
