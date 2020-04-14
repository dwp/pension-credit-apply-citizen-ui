const { expect } = require('chai');
const isoStringToDateObject = require('../../utils/iso-string-to-date-object.js');

describe('Utils: iso-string-to-date-object', () => {
  it('should export a function', () => {
    expect(isoStringToDateObject).to.be.a('function');
  });

  it('should return an object when given a date destructuring', () => {
    expect(isoStringToDateObject('2019-01-01')).to.be.an('object');
  });

  it('should set up the object with yyyy mm dd properties', () => {
    expect(isoStringToDateObject('2019-01-01')).to.deep.equal({
      yyyy: '2019',
      mm: '01',
      dd: '01',
    });
  });

  it('should throw TypeError if does not receive a string', () => {
    expect(() => isoStringToDateObject(123))
      .to.throw(TypeError, 'Expected string got number: 123');
  });

  it('should throw TypeError if string not in correct format', () => {
    expect(() => isoStringToDateObject('201-01-01')).to.throw(TypeError, 'String must be in the format YYYY-MM-DD got: 201-01-01');
    expect(() => isoStringToDateObject('2019-1-01')).to.throw(TypeError, 'String must be in the format YYYY-MM-DD got: 2019-1-01');
    expect(() => isoStringToDateObject('2019-01-1')).to.throw(TypeError, 'String must be in the format YYYY-MM-DD got: 2019-01-1');
    expect(() => isoStringToDateObject('201A-01-01')).to.throw(TypeError, 'String must be in the format YYYY-MM-DD got: 201A-01-01');
  });
});
