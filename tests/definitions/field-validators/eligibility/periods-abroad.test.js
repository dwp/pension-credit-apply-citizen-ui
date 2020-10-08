const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../../lib/constants.js');
const assert = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/periods-abroad.js');

const waypoint = WP.PERIODS_ABROAD;

const dateOfBirth = {
  [WP.DATE_OF_BIRTH]: {
    dateOfBirth: { dd: '01', mm: '01', yyyy: '1920' },
  },
};

describe('Validators: periods-abroad', () => {
  describe('field: periodsAbroad', () => {
    it('should fail "required" validator if no value is provided', async () => {
      const context = new JourneyContext(dateOfBirth);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'periodsAbroad', 'required', context, {
        summary: 'periods-abroad:field.periodsAbroad.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { periodsAbroad: 'test-value' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'periodsAbroad', 'required', context);
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { periodsAbroad: 'bad-value' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'periodsAbroad', 'inArray', context, {
        summary: 'periods-abroad:field.periodsAbroad.required',
      });
    });

    it('should pass "inArray" validator if value is one', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { periodsAbroad: 'one' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'periodsAbroad', 'inArray', context);
    });

    it('should pass "inArray" validator if value is moreThanOne', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { periodsAbroad: 'moreThanOne' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'periodsAbroad', 'inArray', context);
    });
  });
});
