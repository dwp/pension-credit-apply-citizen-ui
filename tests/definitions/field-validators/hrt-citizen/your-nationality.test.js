const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-citizen/your-nationality.js');

describe('Validators: your-nationality', () => {
  describe('field: rightToReside', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'rightToReside', 'required', null, {
        summary: 'your-nationality:field.rightToReside.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'rightToReside', 'required', { rightToReside: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'rightToReside', 'inArray', { rightToReside: 'bad-value' }, {
        summary: 'your-nationality:field.rightToReside.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'rightToReside', 'inArray', { rightToReside: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'rightToReside', 'inArray', { rightToReside: 'no' });
    });
  });

  describe('field: lived2Years', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'lived2Years', 'required', null, {
        summary: 'your-nationality:field.lived2Years.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'lived2Years', 'required', { lived2Years: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'lived2Years', 'inArray', { lived2Years: 'bad-value' }, {
        summary: 'your-nationality:field.lived2Years.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'lived2Years', 'inArray', { lived2Years: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'lived2Years', 'inArray', { lived2Years: 'no' });
    });
  });
});
