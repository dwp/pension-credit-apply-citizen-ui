const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/service-charges.js');

describe('Validators: service-charges', () => {
  describe('field: paysServiceCharges', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'paysServiceCharges', 'required', null, {
        summary: 'service-charges:field.paysServiceCharges.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'paysServiceCharges', 'required', { paysServiceCharges: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'paysServiceCharges', 'inArray', { paysServiceCharges: 'bad-value' }, {
        summary: 'service-charges:field.paysServiceCharges.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'paysServiceCharges', 'inArray', { paysServiceCharges: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'paysServiceCharges', 'inArray', { paysServiceCharges: 'no' });
    });
  });

  describe('field: serviceChargesAmount', () => {
    it('should pass "required" validator if no value is provided and paysServiceCharges is "no"', async () => {
      await expectValidatorToPass(validators, 'serviceChargesAmount', 'required', { paysServiceCharges: 'no' });
    });

    it('should fail "required" validator if no value is provided and paysServiceCharges is "yes"', async () => {
      await expectValidatorToFail(validators, 'serviceChargesAmount', 'required', { paysServiceCharges: 'yes' }, {
        summary: 'service-charges:field.serviceChargesAmount.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and paysServiceCharges is "yes"', async () => {
      await expectValidatorToPass(validators, 'serviceChargesAmount', 'required', { paysServiceCharges: 'yes', serviceChargesAmount: 'Hammond Eggs' });
    });

    it('should pass "isValidMoney" validator if format is invalid and paysServiceCharges is "no"', async () => {
      await expectValidatorToPass(validators, 'serviceChargesAmount', 'isValidMoney', { paysServiceCharges: 'no', serviceChargesAmount: '$Bad Balance$' });
    });

    it('should fail "isValidMoney" validator if format is invalid and paysServiceCharges is "yes"', async () => {
      await expectValidatorToFail(validators, 'serviceChargesAmount', 'isValidMoney', { paysServiceCharges: 'yes', serviceChargesAmount: '$Bad Balance$' }, {
        summary: 'service-charges:field.serviceChargesAmount.format',
      });
    });

    it('should fail "isValidMoney" validator if input is not to 2 decimal places and paysServiceCharges is "yes"', async () => {
      await expectValidatorToFail(validators, 'serviceChargesAmount', 'isValidMoney', { paysServiceCharges: 'yes', serviceChargesAmount: '1' }, {
        summary: 'service-charges:field.serviceChargesAmount.format',
      });
      await expectValidatorToFail(validators, 'serviceChargesAmount', 'isValidMoney', { paysServiceCharges: 'yes', serviceChargesAmount: '1.5' }, {
        summary: 'service-charges:field.serviceChargesAmount.format',
      });
    });

    it('should pass "isValidMoney" validator if input is valid and paysServiceCharges is "yes"', async () => {
      await expectValidatorToPass(validators, 'serviceChargesAmount', 'isValidMoney', { paysServiceCharges: 'yes', serviceChargesAmount: '1.23' });
    });
  });
});
