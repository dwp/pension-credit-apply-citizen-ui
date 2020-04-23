const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/income/private-pensions.js');

describe('Validators: private-pensions', () => {
  describe('field: hasPrivatePensions', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'hasPrivatePensions', 'required', null, {
        summary: 'private-pensions:field.hasPrivatePensions.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'hasPrivatePensions', 'required', { hasPrivatePensions: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'hasPrivatePensions', 'inArray', { hasPrivatePensions: 'bad-value' }, {
        summary: 'private-pensions:field.hasPrivatePensions.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'hasPrivatePensions', 'inArray', { hasPrivatePensions: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'hasPrivatePensions', 'inArray', { hasPrivatePensions: 'no' });
    });
  });

  describe('field: privatePensionDetails', () => {
    it('should pass "required" validator if no value is provided and hasPrivatePensions is "no"', async () => {
      await expectValidatorToPass(validators, 'privatePensionDetails', 'required', { hasPrivatePensions: 'no' });
    });

    it('should fail "required" validator if no value is provided and hasPrivatePensions is "yes"', async () => {
      await expectValidatorToFail(validators, 'privatePensionDetails', 'required', { hasPrivatePensions: 'yes' }, {
        summary: 'private-pensions:field.privatePensionDetails.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and hasPrivatePensions is "yes"', async () => {
      await expectValidatorToPass(validators, 'privatePensionDetails', 'required', { hasPrivatePensions: 'yes', privatePensionDetails: 'Hammond Eggs' });
    });

    it('should pass "strlen" validator if string length > 500 and hasPrivatePensions is "no"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'privatePensionDetails', 'required', { hasPrivatePensions: 'no', privatePensionDetails: longString });
    });

    it('should fail "strlen" validator if string length > 500 and hasPrivatePensions is "yes"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'privatePensionDetails', 'strlen', { hasPrivatePensions: 'yes', privatePensionDetails: longString }, {
        summary: 'private-pensions:field.privatePensionDetails.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and hasPrivatePensions is "yes"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'privatePensionDetails', 'strlen', { hasPrivatePensions: 'yes', privatePensionDetails: longString });
    });
  });
});
