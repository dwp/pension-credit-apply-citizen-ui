const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/partner-national-insurance.js');

describe('Validators: partner-national-insurance', () => {
  describe('field: partnerNino', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerNino', 'required', null, {
        summary: 'partner-national-insurance:field.partnerNino.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerNino', 'required', { partnerNino: 'a-nino' });
    });

    it('should fail "nino" validator if an invalid nino is provided', async () => {
      await expectValidatorToFail(validators, 'partnerNino', 'nino', { partnerNino: 'invalid-nino' }, {
        summary: 'partner-national-insurance:field.partnerNino.format',
      });
    });

    it('should pass "nino" validator if a valid nino is provided', async () => {
      await expectValidatorToPass(validators, 'partnerNino', 'nino', { partnerNino: 'RN001001A' });
    });
  });
});
