const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/mortgage.js');

describe('Validators: mortgage', () => {
  describe('field: hasMortgage', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'hasMortgage', 'required', null, {
        summary: 'mortgage:field.hasMortgage.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'hasMortgage', 'required', { hasMortgage: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'hasMortgage', 'inArray', { hasMortgage: 'bad-value' }, {
        summary: 'mortgage:field.hasMortgage.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'hasMortgage', 'inArray', { hasMortgage: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'hasMortgage', 'inArray', { hasMortgage: 'no' });
    });
  });
});
