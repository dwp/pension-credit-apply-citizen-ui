const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/your-name.js');

describe('Validators: your-name', () => {
  describe('field: fullName', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'fullName', 'required', null, {
        summary: 'your-name:field.fullName.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'fullName', 'required', { fullName: 'Jo Bloggs' });
    });

    it('should fail "strlen" validator if string length > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'fullName', 'strlen', { fullName: longString }, {
        summary: 'your-name:field.fullName.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'fullName', 'strlen', { fullName: longString });
    });
  });
});
