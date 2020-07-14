const { expect } = require('chai');
const isValidTelephoneNumber = require('../../utils/is-valid-telephone-number.js');

const RESOLVE_ERR = new Error('resolved when should have rejected');

describe('Utils: is-valid-telephone-number', () => {
  it('should export a function', () => {
    expect(isValidTelephoneNumber).to.be.a('function');
  });

  it('should return a function', () => {
    expect(isValidTelephoneNumber({})).to.be.a('function');
  });

  it('should return a function that returns a promise', () => {
    const validator = isValidTelephoneNumber({});
    expect(validator('1')).to.be.a('Promise');
  });

  it('should resolve if value contains only digits', (done) => {
    const validator = isValidTelephoneNumber({});
    validator('1234567890')
      .then(() => done())
      .catch(done);
  });

  it('should resolve if value contains digits and spaces', (done) => {
    const validator = isValidTelephoneNumber({});
    validator('1234 567890')
      .then(() => done())
      .catch(done);
  });

  it('should resolve if value contains digits and brackets', (done) => {
    const validator = isValidTelephoneNumber({});
    validator('(1234) 567890')
      .then(() => done())
      .catch(done);
  });

  it('should resolve if value contains digits and dashes', (done) => {
    const validator = isValidTelephoneNumber({});
    validator('(1234) 567-890')
      .then(() => done())
      .catch(done);
  });

  it('should resolve if length is 0', (done) => {
    const validator = isValidTelephoneNumber({});
    validator('')
      .then(() => done())
      .catch(done);
  });

  it('should resolve if length is 20', (done) => {
    const validator = isValidTelephoneNumber({});
    validator('12345678901234567890')
      .then(() => done())
      .catch(done);
  });

  it('should resolve if length is between 0 and 20', (done) => {
    const validator = isValidTelephoneNumber({});
    validator('1234567890')
      .then(() => done())
      .catch(done);
  });

  it('should reject if value contains any letters', (done) => {
    const validator = isValidTelephoneNumber({});
    validator('ABCDEFG 100')
      .then(() => done(RESOLVE_ERR))
      .catch(() => done());
  });

  it('should reject if value contains any other special characters', (done) => {
    const validator = isValidTelephoneNumber({});
    validator('!@£$%^ 0001010')
      .then(() => done(RESOLVE_ERR))
      .catch(() => done());
  });

  it('should reject if length is 21', (done) => {
    const validator = isValidTelephoneNumber({});
    validator('123456789012345678901')
      .then(() => done(RESOLVE_ERR))
      .catch(() => done());
  });

  it('should reject with errorMsg from config', (done) => {
    const validator = isValidTelephoneNumber({ errorMsg: 'test' });
    validator('INVALID')
      .then(() => done(RESOLVE_ERR))
      .catch((err) => {
        expect(err.message).to.equal('test');
        done();
      })
      .catch(done);
  });
});
