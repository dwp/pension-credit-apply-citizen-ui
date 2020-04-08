const { expect } = require('chai');
const formatNino = require('../../utils/format-nino.js');

describe('Utils: format-nino', () => {
  it('should export a function', () => {
    expect(formatNino).to.be.a('function');
  });

  it('should not throw error if input is a string', () => {
    expect(() => formatNino('RN001001Z')).to.not.throw();
  });

  it('should throw error if input is not string', () => {
    expect(() => formatNino(123)).to.throw(TypeError, 'Expected string got number: 123');
  });

  it('should correctly space nino as format RN 00 10 01 Z', () => {
    expect(formatNino('RN001001Z')).to.equal('RN 00 10 01 Z');
  });

  it('should force nino to uppercase', () => {
    expect(formatNino('rn001001z')).to.equal('RN 00 10 01 Z');
  });
});
