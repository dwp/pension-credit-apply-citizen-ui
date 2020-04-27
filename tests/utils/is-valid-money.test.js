const { expect } = require('chai');
const isValidMoney = require('../../utils/is-valid-money.js');

const RESOLVE_ERR = new Error('resolved when should have rejected');

describe('Utils: is-valid-telephone-number', () => {
  it('should export a function', () => {
    expect(isValidMoney).to.be.a('function');
  });

  it('should return a function', () => {
    expect(isValidMoney({})).to.be.a('function');
  });

  it('should return a function that returns a promise', () => {
    const validator = isValidMoney({});
    expect(validator('1.00')).to.be.a('Promise');
  });

  it('should resolve if value is 2 decimal float', (done) => {
    const validator = isValidMoney({});
    validator('1.00')
      .then(() => done())
      .catch(done);
  });

  it('should reject if value contains less than 2 decimals', (done) => {
    const validator = isValidMoney({});
    validator('1.1')
      .then(() => done(RESOLVE_ERR))
      .catch(() => done());
  });

  it('should reject if value contains more than 2 decimals', (done) => {
    const validator = isValidMoney({});
    validator('1.123')
      .then(() => done(RESOLVE_ERR))
      .catch(() => done());
  });

  it('should reject if value contains more no decimals', (done) => {
    const validator = isValidMoney({});
    validator('1')
      .then(() => done(RESOLVE_ERR))
      .catch(() => done());
  });

  it('should reject with errorMsg from config', (done) => {
    const validator = isValidMoney({ errorMsg: 'test' });
    validator('INVALID')
      .then(() => done(RESOLVE_ERR))
      .catch((err) => {
        expect(err.message).to.equal('test');
        done();
      })
      .catch(done);
  });
});
