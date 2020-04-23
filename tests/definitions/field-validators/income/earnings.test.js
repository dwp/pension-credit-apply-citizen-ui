const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/income/earnings.js');

describe('Validators: earnings', () => {
  describe('field: hasEmploymentIncome', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'hasEmploymentIncome', 'required', null, {
        summary: 'earnings:field.hasEmploymentIncome.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'hasEmploymentIncome', 'required', { hasEmploymentIncome: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'hasEmploymentIncome', 'inArray', { hasEmploymentIncome: 'bad-value' }, {
        summary: 'earnings:field.hasEmploymentIncome.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'hasEmploymentIncome', 'inArray', { hasEmploymentIncome: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'hasEmploymentIncome', 'inArray', { hasEmploymentIncome: 'no' });
    });
  });

  describe('field: employmentIncomeDetails', () => {
    it('should pass "required" validator if no value is provided and hasEmploymentIncome is "no"', async () => {
      await expectValidatorToPass(validators, 'employmentIncomeDetails', 'required', { hasEmploymentIncome: 'no' });
    });

    it('should fail "required" validator if no value is provided and hasEmploymentIncome is "yes"', async () => {
      await expectValidatorToFail(validators, 'employmentIncomeDetails', 'required', { hasEmploymentIncome: 'yes' }, {
        summary: 'earnings:field.employmentIncomeDetails.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and hasEmploymentIncome is "yes"', async () => {
      await expectValidatorToPass(validators, 'employmentIncomeDetails', 'required', { hasEmploymentIncome: 'yes', employmentIncomeDetails: 'Job 1' });
    });

    it('should pass "strlen" validator if string length > 500 and hasEmploymentIncome is "no"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'employmentIncomeDetails', 'required', { hasEmploymentIncome: 'no', employmentIncomeDetails: longString });
    });

    it('should fail "strlen" validator if string length > 500 and hasEmploymentIncome is "yes"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'employmentIncomeDetails', 'strlen', { hasEmploymentIncome: 'yes', employmentIncomeDetails: longString }, {
        summary: 'earnings:field.employmentIncomeDetails.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and hasEmploymentIncome is "yes"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'employmentIncomeDetails', 'strlen', { hasEmploymentIncome: 'yes', employmentIncomeDetails: longString });
    });
  });

  describe('field: hasSelfEmploymentIncome', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'hasSelfEmploymentIncome', 'required', null, {
        summary: 'earnings:field.hasSelfEmploymentIncome.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'hasSelfEmploymentIncome', 'required', { hasSelfEmploymentIncome: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'hasSelfEmploymentIncome', 'inArray', { hasSelfEmploymentIncome: 'bad-value' }, {
        summary: 'earnings:field.hasSelfEmploymentIncome.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'hasSelfEmploymentIncome', 'inArray', { hasSelfEmploymentIncome: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'hasSelfEmploymentIncome', 'inArray', { hasSelfEmploymentIncome: 'no' });
    });
  });

  describe('field: selfEmploymentIncomeDetails', () => {
    it('should pass "required" validator if no value is provided and hasSelfEmploymentIncome is "no"', async () => {
      await expectValidatorToPass(validators, 'selfEmploymentIncomeDetails', 'required', { hasSelfEmploymentIncome: 'no' });
    });

    it('should fail "required" validator if no value is provided and hasSelfEmploymentIncome is "yes"', async () => {
      await expectValidatorToFail(validators, 'selfEmploymentIncomeDetails', 'required', { hasSelfEmploymentIncome: 'yes' }, {
        summary: 'earnings:field.selfEmploymentIncomeDetails.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and hasSelfEmploymentIncome is "yes"', async () => {
      await expectValidatorToPass(validators, 'selfEmploymentIncomeDetails', 'required', { hasSelfEmploymentIncome: 'yes', selfEmploymentIncomeDetails: 'Job 1' });
    });

    it('should pass "strlen" validator if string length > 500 and hasSelfEmploymentIncome is "no"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'selfEmploymentIncomeDetails', 'required', { hasSelfEmploymentIncome: 'no', selfEmploymentIncomeDetails: longString });
    });

    it('should fail "strlen" validator if string length > 500 and hasSelfEmploymentIncome is "yes"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'selfEmploymentIncomeDetails', 'strlen', { hasSelfEmploymentIncome: 'yes', selfEmploymentIncomeDetails: longString }, {
        summary: 'earnings:field.selfEmploymentIncomeDetails.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and hasSelfEmploymentIncome is "yes"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'selfEmploymentIncomeDetails', 'strlen', { hasSelfEmploymentIncome: 'yes', selfEmploymentIncomeDetails: longString });
    });
  });
});
