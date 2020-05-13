const { expect } = require('chai');
const formatMoney = require('../../utils/format-money.js');

describe('Utils: format-money', () => {
  it('should export a function', () => {
    expect(formatMoney).to.be.a('function');
  });

  it('should format whole numbers correctly into comma-separated groups', () => {
    expect(formatMoney('1')).to.equal('£1.00');
    expect(formatMoney('100')).to.equal('£100.00');
    expect(formatMoney('1000')).to.equal('£1,000.00');
    expect(formatMoney('1000000')).to.equal('£1,000,000.00');
  });

  it('should format fractional numbers correctly with 2 decimal places', () => {
    expect(formatMoney('1')).to.equal('£1.00');
    expect(formatMoney('1.2')).to.equal('£1.20');
    expect(formatMoney('1.23')).to.equal('£1.23');
  });

  it('should ignore existing commas and £ symbols', () => {
    expect(formatMoney('1.00£')).to.equal('£1.00');
    expect(formatMoney('£10,00.00')).to.equal('£1,000.00');
    expect(formatMoney('1.23')).to.equal('£1.23');
  });

  it('should throw error if input is not string', () => {
    expect(() => formatMoney(123)).to.throw(TypeError, 'Expected string got number: 123');
  });
});
