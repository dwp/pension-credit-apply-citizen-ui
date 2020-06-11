const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/partner-details.js');

describe('Validators: partner-details', () => {
  describe('field: partnerRegisteredBlind', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerRegisteredBlind', 'required', null, {
        summary: 'partner-details:field.partnerRegisteredBlind.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerRegisteredBlind', 'required', { partnerRegisteredBlind: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerRegisteredBlind', 'inArray', { partnerRegisteredBlind: 'bad-value' }, {
        summary: 'partner-details:field.partnerRegisteredBlind.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerRegisteredBlind', 'inArray', { partnerRegisteredBlind: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerRegisteredBlind', 'inArray', { partnerRegisteredBlind: 'no' });
    });
  });
});
