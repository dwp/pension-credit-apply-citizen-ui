const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/housing-benefit.js');

describe('Validators: housing-benefit', () => {
  describe('field: getsHousingBenefit', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'getsHousingBenefit', 'required', null, {
        summary: 'housing-benefit:field.getsHousingBenefit.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'getsHousingBenefit', 'required', { getsHousingBenefit: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'getsHousingBenefit', 'inArray', { getsHousingBenefit: 'bad-value' }, {
        summary: 'housing-benefit:field.getsHousingBenefit.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'getsHousingBenefit', 'inArray', { getsHousingBenefit: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'getsHousingBenefit', 'inArray', { getsHousingBenefit: 'no' });
    });
  });

  describe('field: wantsHousingBenefit', () => {
    it('should pass "required" validator if no value is provided and getsHousingBenefit is "yes"', async () => {
      await expectValidatorToPass(validators, 'wantsHousingBenefit', 'required', { getsHousingBenefit: 'yes' });
    });

    it('should fail "required" validator if no value is provided and getsHousingBenefit is "no"', async () => {
      await expectValidatorToFail(validators, 'wantsHousingBenefit', 'required', { getsHousingBenefit: 'no' }, {
        summary: 'housing-benefit:field.wantsHousingBenefit.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and getsHousingBenefit is "no"', async () => {
      await expectValidatorToPass(validators, 'wantsHousingBenefit', 'required', { getsHousingBenefit: 'no', wantsHousingBenefit: 'yes' });
    });

    it('should pass "inArray" validator if value is not one of the valid options and getsHousingBenefit is "yes"', async () => {
      await expectValidatorToPass(validators, 'wantsHousingBenefit', 'inArray', { getsHousingBenefit: 'yes', wantsHousingBenefit: 'bad-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options and getsHousingBenefit is "no"', async () => {
      await expectValidatorToFail(validators, 'wantsHousingBenefit', 'inArray', { getsHousingBenefit: 'no', wantsHousingBenefit: 'bad-value' }, {
        summary: 'housing-benefit:field.wantsHousingBenefit.required',
      });
    });

    it('should pass "inArray" validator if value is one of the valid options and paysGroundRent is "no"', async () => {
      await expectValidatorToPass(validators, 'wantsHousingBenefit', 'inArray', { getsHousingBenefit: 'no', wantsHousingBenefit: 'yes' });
    });
  });
});
