const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-citizen/returned-to-uk.js');

describe('Validators: returned-to-uk', () => {
  describe('field: cameToUk', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'cameToUk', 'required', null, {
        summary: 'returned-to-uk:field.cameToUk.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'cameToUk', 'required', { cameToUk: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'cameToUk', 'inArray', { cameToUk: 'bad-value' }, {
        summary: 'returned-to-uk:field.cameToUk.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'cameToUk', 'inArray', { cameToUk: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'cameToUk', 'inArray', { cameToUk: 'no' });
    });
  });
});
