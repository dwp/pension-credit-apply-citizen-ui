const { expect } = require('chai');
const formatMoney = require('../../utils/format-money.js');

describe('Utils: format-money', () => {
  it('should export a function', () => {
    expect(formatMoney).to.be.a('function');
  });

  it('should format whole numbers correctly into comma-separated groups', () => {
    expect(formatMoney(1)).to.equal('£1.00');
    expect(formatMoney(100)).to.equal('£100.00');
    expect(formatMoney(1000)).to.equal('£1,000.00');
    expect(formatMoney(1000000)).to.equal('£1,000,000.00');
  });

  it('should format fractional numbers correctly with 2 decimal places', () => {
    expect(formatMoney(1)).to.equal('£1.00');
    expect(formatMoney(1.2)).to.equal('£1.20');
    expect(formatMoney(1.23)).to.equal('£1.23');
  });

  it('should return £NaN if given a non-stringable number argument', () => {
    expect(formatMoney(['1.00', '2.00'])).to.equal('£NaN');
    expect(formatMoney({})).to.equal('£NaN');
    expect(formatMoney(() => {})).to.equal('£NaN');
  });

  it('should convert a string to a number and format correctly', () => {
    expect(formatMoney('2.34')).to.equal('£2.34');
  });
});
