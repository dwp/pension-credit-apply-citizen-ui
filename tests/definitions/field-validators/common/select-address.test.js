const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/common/select-address.js');

describe('Validators: select-address', () => {
  describe('field: uprn', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'uprn', 'required', null, {
        summary: 'select-address:field.address.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'uprn', 'required', { uprn: 'test-value' });
    });

    it('should fail "regex" validator if value is not a 1-12 digit string', async () => {
      await expectValidatorToFail(validators, 'uprn', 'regex', { uprn: 'invalid-str' }, {
        summary: 'select-address:field.address.required',
      });
      await expectValidatorToFail(validators, 'uprn', 'regex', { uprn: '1234567890123' }, {
        summary: 'select-address:field.address.required',
      });
    });

    it('should pass "regex" validator if value is a 1-12 digit string', async () => {
      await expectValidatorToPass(validators, 'uprn', 'regex', { uprn: '1' });
      await expectValidatorToPass(validators, 'uprn', 'regex', { uprn: '123456789012' });
    });
  });
});
