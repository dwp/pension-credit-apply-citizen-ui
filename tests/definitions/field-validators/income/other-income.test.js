const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/income/other-income.js');

describe('Validators: other-income', () => {
  describe('field: hasOtherIncome', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'hasOtherIncome', 'required', null, {
        summary: 'other-income:field.hasOtherIncome.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'hasOtherIncome', 'required', { hasOtherIncome: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'hasOtherIncome', 'inArray', { hasOtherIncome: 'bad-value' }, {
        summary: 'other-income:field.hasOtherIncome.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'hasOtherIncome', 'inArray', { hasOtherIncome: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'hasOtherIncome', 'inArray', { hasOtherIncome: 'no' });
    });
  });

  describe('field: otherIncomeDetails', () => {
    it('should pass "required" validator if no value is provided and hasOtherIncome is "no"', async () => {
      await expectValidatorToPass(validators, 'otherIncomeDetails', 'required', { hasOtherIncome: 'no' });
    });

    it('should fail "required" validator if no value is provided and hasOtherIncome is "yes"', async () => {
      await expectValidatorToFail(validators, 'otherIncomeDetails', 'required', { hasOtherIncome: 'yes' }, {
        summary: 'other-income:field.otherIncomeDetails.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and hasOtherIncome is "yes"', async () => {
      await expectValidatorToPass(validators, 'otherIncomeDetails', 'required', { hasOtherIncome: 'yes', otherIncomeDetails: 'Hammond Eggs' });
    });

    it('should pass "strlen" validator if string length > 500 and hasOtherIncome is "no"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'otherIncomeDetails', 'required', { hasOtherIncome: 'no', otherIncomeDetails: longString });
    });

    it('should fail "strlen" validator if string length > 500 and hasOtherIncome is "yes"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'otherIncomeDetails', 'strlen', { hasOtherIncome: 'yes', otherIncomeDetails: longString }, {
        summary: 'other-income:field.otherIncomeDetails.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and hasOtherIncome is "yes"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'otherIncomeDetails', 'strlen', { hasOtherIncome: 'yes', otherIncomeDetails: longString });
    });
  });
});
