const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/money/second-property.js');

describe('Validators: second-property', () => {
  describe('field: hasSecondProperty', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'hasSecondProperty', 'required', null, {
        summary: 'second-property:field.hasSecondProperty.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'hasSecondProperty', 'required', { hasSecondProperty: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'hasSecondProperty', 'inArray', { hasSecondProperty: 'bad-value' }, {
        summary: 'second-property:field.hasSecondProperty.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'hasSecondProperty', 'inArray', { hasSecondProperty: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'hasSecondProperty', 'inArray', { hasSecondProperty: 'no' });
    });
  });
});
