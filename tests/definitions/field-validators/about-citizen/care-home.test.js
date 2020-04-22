const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/care-home.js');

describe('Validators: care-home', () => {
  describe('field: permanentlyInCareHome', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'permanentlyInCareHome', 'required', null, {
        summary: 'care-home:field.permanentlyInCareHome.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'permanentlyInCareHome', 'required', { permanentlyInCareHome: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'permanentlyInCareHome', 'inArray', { permanentlyInCareHome: 'bad-value' }, {
        summary: 'care-home:field.permanentlyInCareHome.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'permanentlyInCareHome', 'inArray', { permanentlyInCareHome: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'permanentlyInCareHome', 'inArray', { permanentlyInCareHome: 'no' });
    });
  });

  describe('field: stillOwnsHome', () => {
    it('should pass "required" validator if no value is provided and permanentlyInCareHome is "no"', async () => {
      await expectValidatorToPass(validators, 'stillOwnsHome', 'required', { permanentlyInCareHome: 'no' });
    });

    it('should fail "required" validator if no value is provided and permanentlyInCareHome is "yes"', async () => {
      await expectValidatorToFail(validators, 'stillOwnsHome', 'required', { permanentlyInCareHome: 'yes' }, {
        summary: 'care-home:field.stillOwnsHome.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and permanentlyInCareHome is "yes"', async () => {
      await expectValidatorToPass(validators, 'stillOwnsHome', 'required', { permanentlyInCareHome: 'yes', stillOwnsHome: 'test-value' });
    });

    it('should pass "inArray" validator if value is not one of the valid options and permanentlyInCareHome is "no"', async () => {
      await expectValidatorToPass(validators, 'stillOwnsHome', 'inArray', { permanentlyInCareHome: 'no' });
    });

    it('should fail "inArray" validator if value is not one of the valid options and permanentlyInCareHome is "yes"', async () => {
      await expectValidatorToFail(validators, 'stillOwnsHome', 'inArray', { permanentlyInCareHome: 'yes', stillOwnsHome: 'bad-value' }, {
        summary: 'care-home:field.stillOwnsHome.required',
      });
    });

    it('should pass "inArray" validator if value is yes and permanentlyInCareHome is "yes"', async () => {
      await expectValidatorToPass(validators, 'stillOwnsHome', 'inArray', { permanentlyInCareHome: 'yes', stillOwnsHome: 'yes' });
    });

    it('should pass "inArray" validator if value is no and permanentlyInCareHome is "yes"', async () => {
      await expectValidatorToPass(validators, 'stillOwnsHome', 'inArray', { permanentlyInCareHome: 'yes', stillOwnsHome: 'no' });
    });
  });
});
