const { expect } = require('chai');

const sanitise = require('../../utils/sanitise-nino.js');

describe('Utils: sanitise-nino', () => {
  it('should export a function', () => {
    expect(sanitise).is.an.instanceOf(Function);
  });

  it('should return a string', () => {
    const output = sanitise(' QQ 11 22 33 Q ');
    expect(output).to.be.a('string');
  });

  it('should strip spaces from string', () => {
    const output = sanitise(' QQ 11 22 33 Q ');
    expect(output).to.equal('QQ112233Q');
  });

  it('should convert string to uppercase', () => {
    const output = sanitise('qq112233q');
    expect(output).to.equal('QQ112233Q');
  });

  it('should throw error if input is not string', () => {
    expect(() => sanitise(123)).to.throw(TypeError, 'Expected string got number: 123');
  });
});
