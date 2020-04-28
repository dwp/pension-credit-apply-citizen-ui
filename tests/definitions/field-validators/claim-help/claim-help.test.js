const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/claim-help/claim-help.js');

describe('Validators: claim-help', () => {
  describe('field: helpMakingClaim', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'helpMakingClaim', 'required', null, {
        summary: 'claim-help:field.helpMakingClaim.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'helpMakingClaim', 'required', { helpMakingClaim: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'helpMakingClaim', 'inArray', { helpMakingClaim: 'bad-value' }, {
        summary: 'claim-help:field.helpMakingClaim.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'helpMakingClaim', 'inArray', { helpMakingClaim: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'helpMakingClaim', 'inArray', { helpMakingClaim: 'no' });
    });
  });
});
