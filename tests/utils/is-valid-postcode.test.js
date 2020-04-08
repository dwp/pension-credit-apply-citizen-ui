const { expect } = require('chai');
const isValidPostcode = require('../../utils/is-valid-postcode.js');

describe('Utils: is-valid-postcode', () => {
  it('should export a function', () => {
    expect(isValidPostcode).to.be.a('function');
  });

  it('should return a promise', () => {
    expect(isValidPostcode('AA9A9AA')).to.be.a('Promise');
  });

  it('should resolve if postcode is valid', (done) => {
    isValidPostcode('AA9A9AA')
      .then(() => done())
      .catch(done);
  });

  it('should resolve for L27 8XY', (done) => {
    isValidPostcode('L27 8XY')
      .then(() => done())
      .catch(done);
  });

  it('should resolve for NR103EZ', (done) => {
    isValidPostcode('NR103EZ')
      .then(() => done())
      .catch(done);
  });

  it('should resolve for RG45AY', (done) => {
    isValidPostcode('RG45AY')
      .then(() => done())
      .catch(done);
  });

  it('should resolve for NE69 7AW', (done) => {
    isValidPostcode('NE69 7AW')
      .then(() => done())
      .catch(done);
  });

  it('should resolve for SE23 2NF', (done) => {
    isValidPostcode('SE23 2NF')
      .then(() => done())
      .catch(done);
  });

  it('should resolve for BT35 8GE', (done) => {
    isValidPostcode('BT35 8GE')
      .then(() => done())
      .catch(done);
  });

  it('should resolve for MA1 1AA', (done) => {
    isValidPostcode('MA1 1AA')
      .then(() => done())
      .catch(done);
  });

  it('should reject for 1A1 1AA', (done) => {
    isValidPostcode('1A1 1AA')
      .catch(() => done());
  });

  it('should reject for EH1 JS', (done) => {
    isValidPostcode('EH1 JS')
      .catch(() => done());
  });

  it('should reject for EH1JS', (done) => {
    isValidPostcode('EH1JS')
      .catch(() => done());
  });

  it('should reject for EH 1JS', (done) => {
    isValidPostcode('EH 1JS')
      .catch(() => done());
  });

  it('should reject for INVALID', (done) => {
    isValidPostcode('INVALID')
      .catch(() => done());
  });

  it('should reject for empty', (done) => {
    isValidPostcode()
      .catch(() => done());
  });

  it('should ignore case', (done) => {
    isValidPostcode('nr103ez')
      .then(() => done())
      .catch(done);
  });
});
