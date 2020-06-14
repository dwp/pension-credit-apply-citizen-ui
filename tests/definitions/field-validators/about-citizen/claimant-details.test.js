const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/claimant-details.js');

describe('Validators: claimant-details', () => {
  describe('field: registeredBlind', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'registeredBlind', 'required', null, {
        summary: 'claimant-details:field.registeredBlind.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'registeredBlind', 'required', { registeredBlind: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'registeredBlind', 'inArray', { registeredBlind: 'bad-value' }, {
        summary: 'claimant-details:field.registeredBlind.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'registeredBlind', 'inArray', { registeredBlind: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'registeredBlind', 'inArray', { registeredBlind: 'no' });
    });
  });

  describe('field: helpWithLettersPhone', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'helpWithLettersPhone', 'required', null, {
        summary: 'claimant-details:field.helpWithLettersPhone.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'helpWithLettersPhone', 'required', { helpWithLettersPhone: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'helpWithLettersPhone', 'inArray', { helpWithLettersPhone: 'bad-value' }, {
        summary: 'claimant-details:field.helpWithLettersPhone.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'helpWithLettersPhone', 'inArray', { helpWithLettersPhone: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'helpWithLettersPhone', 'inArray', { helpWithLettersPhone: 'no' });
    });
  });
});
