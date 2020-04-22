const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/partner-nationality.js');

describe('Validators: partner-nationality', () => {
  describe('field: partnerRightToReside', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerRightToReside', 'required', null, {
        summary: 'partner-nationality:field.partnerRightToReside.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerRightToReside', 'required', { partnerRightToReside: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerRightToReside', 'inArray', { partnerRightToReside: 'bad-value' }, {
        summary: 'partner-nationality:field.partnerRightToReside.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerRightToReside', 'inArray', { partnerRightToReside: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerRightToReside', 'inArray', { partnerRightToReside: 'no' });
    });
  });

  describe('field: partnerLived2Years', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerLived2Years', 'required', null, {
        summary: 'partner-nationality:field.partnerLived2Years.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerLived2Years', 'required', { partnerLived2Years: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerLived2Years', 'inArray', { partnerLived2Years: 'bad-value' }, {
        summary: 'partner-nationality:field.partnerLived2Years.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerLived2Years', 'inArray', { partnerLived2Years: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerLived2Years', 'inArray', { partnerLived2Years: 'no' });
    });
  });
});
