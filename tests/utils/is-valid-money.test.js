const { expect } = require('chai');
const { ValidationError } = require('@dwp/govuk-casa');
const isValidMoney = require('../../utils/is-valid-money.js');

const expectToBeError = (err) => expect(err).to.be.instanceOf(Error);
const expectNotToBeError = (err) => expect(err).to.not.be.instanceOf(Error);

const expectToReject = [expectToBeError, expectToBeError];
const expectToResolve = [expectNotToBeError, expectNotToBeError];

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

  it('should resolve if value is a integer', async () => {
    const validator = isValidMoney({});
    validator('1000').then(...expectToResolve);
  });

  it('should resolve if value is to two decimal places', async () => {
    const validator = isValidMoney({});
    validator('10.00').then(...expectToResolve);
  });

  it('should resolve if value has correct comma format', async () => {
    const validator = isValidMoney({});
    validator('1,000').then(...expectToResolve);
    validator('10,000').then(...expectToResolve);
    validator('100,000').then(...expectToResolve);
    validator('1,000,000').then(...expectToResolve);
    validator('1,000,000.00').then(...expectToResolve);
  });

  it('should resolve if value starts with a £ symbol', async () => {
    const validator = isValidMoney({});
    validator('£1000').then(...expectToResolve);
    validator('£1000.00').then(...expectToResolve);
    validator('£1,000').then(...expectToResolve);
    validator('£1,000.00').then(...expectToResolve);
  });

  it('should resolve if value is up to 9 digits', async () => {
    const validator = isValidMoney({});
    validator('100000000').then(...expectToResolve);
    validator('£100000000').then(...expectToResolve);
    validator('100,000,000').then(...expectToResolve);
    validator('£100,000,000').then(...expectToResolve);
  });

  it('should resolve if value is up to 9 digits including 2 decimal places', async () => {
    const validator = isValidMoney({});
    validator('100000000.00').then(...expectToResolve);
    validator('£100000000.00').then(...expectToResolve);
    validator('100,000,000.00').then(...expectToResolve);
    validator('£100,000,000.00').then(...expectToResolve);
  });

  it('should reject if value not a number', async () => {
    const validator = isValidMoney({});
    await validator('INVALID').then(...expectToReject);
  });

  it('should reject if value contains only 1 decimal', async () => {
    const validator = isValidMoney({});
    await validator('1.1').then(...expectToReject);
  });

  it('should reject if value contains more than 2 decimals', async () => {
    const validator = isValidMoney({});
    await validator('1.123').then(...expectToReject);
  });

  it('should reject if value contains £ somewhere other than the start', async () => {
    const validator = isValidMoney({});
    await validator('100£').then(...expectToReject);
    await validator('10£00').then(...expectToReject);
    await validator('10.£00').then(...expectToReject);
  });

  it('should reject if commas aren\'t the correct place', async () => {
    const validator = isValidMoney({});
    await validator('10,0').then(...expectToReject);
    await validator('10,00').then(...expectToReject);
    await validator('1000.0,0').then(...expectToReject);
  });

  it('should reject if value contains no digits before the decimal point', async () => {
    const validator = isValidMoney({});
    await validator('.50').then(...expectToReject);
  });

  it('should reject if value is longer than 9 digits', async () => {
    const validator = isValidMoney({});
    await validator('1000000000').then(...expectToReject);
    await validator('1,000,000,000').then(...expectToReject);
    await validator('£1000000000').then(...expectToReject);
    await validator('£1,000,000,000').then(...expectToReject);
  });

  it('should reject if value is longer than 9 digits with 2 decimal places', async () => {
    const validator = isValidMoney({});
    await validator('1000000000.00').then(...expectToReject);
    await validator('1,000,000,000.00').then(...expectToReject);
    await validator('£1000000000.00').then(...expectToReject);
    await validator('£1,000,000,000.00').then(...expectToReject);
  });

  it('should reject with errorMsg from config', async () => {
    const validator = isValidMoney({ errorMsg: 'test' });
    await validator('INVALID')
      .then(expectToBeError, (err) => expect(err.message).to.equal('test'));
  });

  it('should reject with instance of ValidationError', async () => {
    const validator = isValidMoney({ errorMsg: 'test' });
    await validator('INVALID')
      .then(expectToBeError, (err) => expect(err).to.be.instanceOf(ValidationError));
  });
});
