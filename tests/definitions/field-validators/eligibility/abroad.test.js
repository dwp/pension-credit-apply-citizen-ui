const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../../lib/constants.js');
const assert = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/abroad.js');

const waypoint = WP.ABROAD;

const dateOfBirth = {
  [WP.DATE_OF_BIRTH]: {
    dateOfBirth: { dd: '01', mm: '01', yyyy: '1920' },
  },
};

describe('Validators: abroad', () => {
  describe('field: abroadMoreThan4Weeks', () => {
    it('should fail "required" validator if no value is provided', async () => {
      const context = new JourneyContext(dateOfBirth);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'abroadMoreThan4Weeks', 'required', context, {
        summary: 'abroad:field.abroadMoreThan4Weeks.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { abroadMoreThan4Weeks: 'test-value' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'abroadMoreThan4Weeks', 'required', context);
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { abroadMoreThan4Weeks: 'bad-value' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'abroadMoreThan4Weeks', 'inArray', context, {
        summary: 'abroad:field.abroadMoreThan4Weeks.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { abroadMoreThan4Weeks: 'yes' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'abroadMoreThan4Weeks', 'inArray', context);
    });

    it('should pass "inArray" validator if value is no', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { abroadMoreThan4Weeks: 'no' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'abroadMoreThan4Weeks', 'inArray', context);
    });
  });
});
