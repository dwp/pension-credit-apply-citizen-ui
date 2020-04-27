const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-partner/uk-sponsorship.js');

describe('Validators: partner-uk-sponsorship', () => {
  describe('field: partnerSponsorshipUndertaking', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerSponsorshipUndertaking', 'required', null, {
        summary: 'partner-uk-sponsorship:field.partnerSponsorshipUndertaking.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerSponsorshipUndertaking', 'required', { partnerSponsorshipUndertaking: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerSponsorshipUndertaking', 'inArray', { partnerSponsorshipUndertaking: 'bad-value' }, {
        summary: 'partner-uk-sponsorship:field.partnerSponsorshipUndertaking.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerSponsorshipUndertaking', 'inArray', { partnerSponsorshipUndertaking: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerSponsorshipUndertaking', 'inArray', { partnerSponsorshipUndertaking: 'no' });
    });
  });
});
