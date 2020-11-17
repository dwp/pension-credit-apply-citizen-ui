const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/income/carers.js');

describe('Validators: carers', () => {
  describe('field: anyoneGetCarers', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'anyoneGetCarers', 'required', null, {
        summary: 'carers:field.anyoneGetCarers.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'anyoneGetCarers', 'required', { anyoneGetCarers: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'anyoneGetCarers', 'inArray', { anyoneGetCarers: 'bad-value' }, {
        summary: 'carers:field.anyoneGetCarers.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'anyoneGetCarers', 'inArray', { anyoneGetCarers: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'anyoneGetCarers', 'inArray', { anyoneGetCarers: 'no' });
    });
  });
});
