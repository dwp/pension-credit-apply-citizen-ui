const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/partner-agree.js');

describe('Validators: partner-agree', () => {
  describe('field: partnerAgree', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerAgree', 'required', null, {
        summary: 'partner-agree:field.partnerAgree.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerAgree', 'required', { partnerAgree: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerAgree', 'inArray', { partnerAgree: 'bad-value' }, {
        summary: 'partner-agree:field.partnerAgree.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerAgree', 'inArray', { partnerAgree: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerAgree', 'inArray', { partnerAgree: 'no' });
    });
  });
});
