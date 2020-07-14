const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/contact-details/different-formats.js');

describe('Validators: different-formats', () => {
  describe('field: needsDifferentFormats', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'needsDifferentFormats', 'required', null, {
        summary: 'different-formats:field.needsDifferentFormats.requiredClaimant',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'needsDifferentFormats', 'required', { needsDifferentFormats: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'needsDifferentFormats', 'inArray', { needsDifferentFormats: 'bad-value' }, {
        summary: 'different-formats:field.needsDifferentFormats.requiredClaimant',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'needsDifferentFormats', 'inArray', { needsDifferentFormats: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'needsDifferentFormats', 'inArray', { needsDifferentFormats: 'no' });
    });
  });
});
