const { expect } = require('chai');
const santiseMoney = require('../../utils/sanitise-money.js');

describe('Utils: sanitise-money', () => {
  it('should export a function', () => {
    expect(santiseMoney).to.be.a('function');
  });

  it('should strip £ symbol from start of the string', () => {
    expect(santiseMoney('£1000.00')).to.equal('1000.00');
  });

  it('should strip commas from the string', () => {
    expect(santiseMoney('£1,000,000.00')).to.equal('1000000.00');
  });

  it('should add .00 if string has no decimal places', () => {
    expect(santiseMoney('£1000')).to.equal('1000.00');
  });

  it('should throw error if input is not string', () => {
    expect(() => santiseMoney(123)).to.throw(TypeError, 'Expected string got number: 123');
  });
});
