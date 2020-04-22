const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/letters-home.js');

describe('Validators: letters-home', () => {
  describe('field: sendLettersToHome', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'sendLettersToHome', 'required', null, {
        summary: 'letters-home:field.sendLettersToHome.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'sendLettersToHome', 'required', { sendLettersToHome: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'sendLettersToHome', 'inArray', { sendLettersToHome: 'bad-value' }, {
        summary: 'letters-home:field.sendLettersToHome.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'sendLettersToHome', 'inArray', { sendLettersToHome: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'sendLettersToHome', 'inArray', { sendLettersToHome: 'no' });
    });
  });
});
