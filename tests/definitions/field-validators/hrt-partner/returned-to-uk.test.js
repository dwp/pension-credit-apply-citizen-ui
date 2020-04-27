const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-partner/returned-to-uk.js');

describe('Validators: partner-returned-to-uk', () => {
  describe('field: partnerCameToUk', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerCameToUk', 'required', null, {
        summary: 'partner-returned-to-uk:field.partnerCameToUk.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerCameToUk', 'required', { partnerCameToUk: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerCameToUk', 'inArray', { partnerCameToUk: 'bad-value' }, {
        summary: 'partner-returned-to-uk:field.partnerCameToUk.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerCameToUk', 'inArray', { partnerCameToUk: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerCameToUk', 'inArray', { partnerCameToUk: 'no' });
    });
  });
});
