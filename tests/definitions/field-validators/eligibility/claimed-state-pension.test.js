const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/claimed-state-pension.js');

describe('Validators: claimed-state-pension', () => {
  describe('field: statePensionClaimed', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'statePensionClaimed', 'required', null, {
        summary: 'claimed-state-pension:field.statePensionClaimed.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'statePensionClaimed', 'required', { statePensionClaimed: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'statePensionClaimed', 'inArray', { statePensionClaimed: 'bad-value' }, {
        summary: 'claimed-state-pension:field.statePensionClaimed.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'statePensionClaimed', 'inArray', { statePensionClaimed: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'statePensionClaimed', 'inArray', { statePensionClaimed: 'no' });
    });
  });
});
