const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/contact-details/letter-address.js');

describe('Validators: letter-address', () => {
  describe('field: letterAddress', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'letterAddress', 'required', null, {
        summary: 'letter-address:field.letterAddress.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'letterAddress', 'required', { letterAddress: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'letterAddress', 'inArray', { letterAddress: 'bad-value' }, {
        summary: 'letter-address:field.letterAddress.required',
      });
    });

    it('should pass "inArray" validator if value is homeAddress', async () => {
      await expectValidatorToPass(validators, 'letterAddress', 'inArray', { letterAddress: 'homeAddress' });
    });

    it('should pass "inArray" validator if value is differentAddress', async () => {
      await expectValidatorToPass(validators, 'letterAddress', 'inArray', { letterAddress: 'differentAddress' });
    });
  });
});
