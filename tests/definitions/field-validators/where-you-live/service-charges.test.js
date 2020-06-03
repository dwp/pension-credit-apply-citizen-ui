const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/service-charges.js');

describe('Validators: service-charges', () => {
  describe('field: paysServiceCharges', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'paysServiceCharges', 'required', null, {
        summary: 'service-charges:field.paysServiceCharges.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'paysServiceCharges', 'required', { paysServiceCharges: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'paysServiceCharges', 'inArray', { paysServiceCharges: 'bad-value' }, {
        summary: 'service-charges:field.paysServiceCharges.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'paysServiceCharges', 'inArray', { paysServiceCharges: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'paysServiceCharges', 'inArray', { paysServiceCharges: 'no' });
    });
  });

  describe('field: paysGroundRent', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'paysGroundRent', 'required', null, {
        summary: 'service-charges:field.paysGroundRent.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'paysGroundRent', 'required', { paysGroundRent: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'paysGroundRent', 'inArray', { paysGroundRent: 'bad-value' }, {
        summary: 'service-charges:field.paysGroundRent.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'paysGroundRent', 'inArray', { paysGroundRent: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'paysGroundRent', 'inArray', { paysGroundRent: 'no' });
    });
  });

  describe('field: getsHousingBenefit', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'getsHousingBenefit', 'required', null, {
        summary: 'service-charges:field.getsHousingBenefit.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'getsHousingBenefit', 'required', { getsHousingBenefit: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'getsHousingBenefit', 'inArray', { getsHousingBenefit: 'bad-value' }, {
        summary: 'service-charges:field.getsHousingBenefit.required',
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
        summary: 'service-charges:field.wantsHousingBenefit.required',
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
        summary: 'service-charges:field.wantsHousingBenefit.required',
      });
    });

    it('should pass "inArray" validator if value is one of the valid options and paysGroundRent is "no"', async () => {
      await expectValidatorToPass(validators, 'wantsHousingBenefit', 'inArray', { getsHousingBenefit: 'no', wantsHousingBenefit: 'yes' });
    });
  });
});
