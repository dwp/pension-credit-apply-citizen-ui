const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/national-insurance.js');

describe('Validators: national-insurance', () => {
  describe('field: nino', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'nino', 'required', null, {
        summary: 'national-insurance:field.nino.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'nino', 'required', { nino: 'a-nino' });
    });

    it('should fail "nino" validator if an invalid nino is provided', async () => {
      await expectValidatorToFail(validators, 'nino', 'nino', { nino: 'invalid-nino' }, {
        summary: 'national-insurance:field.nino.format',
      });
    });

    it('should pass "nino" validator if a valid nino is provided', async () => {
      await expectValidatorToPass(validators, 'nino', 'nino', { nino: 'RN001001A' });
    });
  });
});
