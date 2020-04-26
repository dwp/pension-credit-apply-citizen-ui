const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-citizen/uk-sponsorship.js');

describe('Validators: uk-sponsorship', () => {
  describe('field: sponsorshipUndertaking', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'sponsorshipUndertaking', 'required', null, {
        summary: 'uk-sponsorship:field.sponsorshipUndertaking.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'sponsorshipUndertaking', 'required', { sponsorshipUndertaking: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'sponsorshipUndertaking', 'inArray', { sponsorshipUndertaking: 'bad-value' }, {
        summary: 'uk-sponsorship:field.sponsorshipUndertaking.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'sponsorshipUndertaking', 'inArray', { sponsorshipUndertaking: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'sponsorshipUndertaking', 'inArray', { sponsorshipUndertaking: 'no' });
    });
  });
});
