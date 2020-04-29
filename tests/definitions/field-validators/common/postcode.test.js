const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/common/postcode.js')();

describe('Validators: postcode', () => {
  describe('field: postcode', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'postcode', 'required', null, {
        summary: 'postcode:field.postcode.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'postcode', 'required', { postcode: 'Valid Address' });
    });

    it('should fail "isValidPostcode" validator if value is an invalid postcode', async () => {
      await expectValidatorToFail(validators, 'postcode', 'isValidPostcode', { postcode: '11X X11' }, {
        summary: 'postcode:field.postcode.format',
      });
    });

    it('should pass "isValidPostcode" validator if value is a valid postcode', async () => {
      await expectValidatorToPass(validators, 'postcode', 'isValidPostcode', { postcode: 'AA1 1AA' });
    });
  });
});
