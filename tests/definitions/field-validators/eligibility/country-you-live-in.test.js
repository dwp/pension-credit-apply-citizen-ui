const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/country-you-live-in.js');

describe('Validators: country-you-live-in', () => {
  describe('field: countryOfResidence', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'countryOfResidence', 'required', null, {
        summary: 'country-you-live-in:field.countryOfResidence.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'countryOfResidence', 'required', { countryOfResidence: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'countryOfResidence', 'inArray', { countryOfResidence: 'bad-value' }, {
        summary: 'country-you-live-in:field.countryOfResidence.required',
      });
    });

    it('should pass "inArray" validator if value is ENGLAND', async () => {
      await expectValidatorToPass(validators, 'countryOfResidence', 'inArray', { countryOfResidence: 'ENGLAND' });
    });

    it('should pass "inArray" validator if value is SCOTLAND', async () => {
      await expectValidatorToPass(validators, 'countryOfResidence', 'inArray', { countryOfResidence: 'SCOTLAND' });
    });

    it('should pass "inArray" validator if value is WALES', async () => {
      await expectValidatorToPass(validators, 'countryOfResidence', 'inArray', { countryOfResidence: 'WALES' });
    });

    it('should pass "inArray" validator if value is NORTHERN_IRELAND', async () => {
      await expectValidatorToPass(validators, 'countryOfResidence', 'inArray', { countryOfResidence: 'NORTHERN_IRELAND' });
    });

    it('should pass "inArray" validator if value is somewhereElse', async () => {
      await expectValidatorToPass(validators, 'countryOfResidence', 'inArray', { countryOfResidence: 'somewhereElse' });
    });
  });
});
