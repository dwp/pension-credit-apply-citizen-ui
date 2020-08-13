const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-partner/asylum-seeker.js');

describe('Validators: partner-asylum-seeker', () => {
  describe('field: partnerAsylumSeeker', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerAsylumSeeker', 'required', null, {
        summary: 'partner-asylum-seeker:field.partnerAsylumSeeker.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumSeeker', 'required', { partnerAsylumSeeker: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerAsylumSeeker', 'inArray', { partnerAsylumSeeker: 'bad-value' }, {
        summary: 'partner-asylum-seeker:field.partnerAsylumSeeker.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumSeeker', 'inArray', { partnerAsylumSeeker: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumSeeker', 'inArray', { partnerAsylumSeeker: 'no' });
    });
  });
});
