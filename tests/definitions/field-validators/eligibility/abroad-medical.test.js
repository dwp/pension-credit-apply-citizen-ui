const { JourneyContext } = require('@dwp/govuk-casa');
const { expectValidatorToFail, expectValidatorToFailWithJourney, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const { waypoints: WP } = require('../../../../lib/constants.js');
const validators = require('../../../../definitions/field-validators/eligibility/abroad-medical.js');

describe('Validators: abroad-medical', () => {
  describe('field: periodAbroadForMedical', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'periodAbroadForMedical', 'required', null, {
        summary: 'abroad-medical:field.periodAbroadForMedical.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'periodAbroadForMedical', 'required', { periodAbroadForMedical: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'periodAbroadForMedical', 'inArray', { periodAbroadForMedical: 'bad-value' }, {
        summary: 'abroad-medical:field.periodAbroadForMedical.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'periodAbroadForMedical', 'inArray', { periodAbroadForMedical: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'periodAbroadForMedical', 'inArray', { periodAbroadForMedical: 'no' });
    });

    it('should use plural message if there was more than one period abroad', async () => {
      const context = new JourneyContext({
        [WP.PERIODS_ABROAD]: { periodsAbroad: 'moreThanOne' },
        [WP.ABROAD_MEDICAL]: { periodAbroadForMedical: 'bad-value' },
      });
      await expectValidatorToFailWithJourney(validators, WP.ABROAD_MEDICAL, 'periodAbroadForMedical', 'inArray', context, {
        summary: 'abroad-medical:field.periodAbroadForMedical.requiredPlural',
      });
    });
  });
});
