const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-citizen/asylum-seeker.js');

describe('Validators: asylum-seeker', () => {
  describe('field: asylumSeeker', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'asylumSeeker', 'required', null, {
        summary: 'asylum-seeker:field.asylumSeeker.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'asylumSeeker', 'required', { asylumSeeker: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'asylumSeeker', 'inArray', { asylumSeeker: 'bad-value' }, {
        summary: 'asylum-seeker:field.asylumSeeker.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'asylumSeeker', 'inArray', { asylumSeeker: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'asylumSeeker', 'inArray', { asylumSeeker: 'no' });
    });
  });
});
