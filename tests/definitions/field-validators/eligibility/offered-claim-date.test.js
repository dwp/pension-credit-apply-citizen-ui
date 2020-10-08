const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../../lib/constants.js');
const assert = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/offered-claim-date.js');

const waypoint = WP.OFFERED_CLAIM_DATE;

const dateOfBirth = {
  [WP.DATE_OF_BIRTH]: {
    dateOfBirth: { dd: '01', mm: '01', yyyy: '1920' },
  },
};

describe('Validators: offered-claim-date', () => {
  describe('field: acceptClaimDate', () => {
    it('should fail "required" validator if no value is provided', async () => {
      const context = new JourneyContext(dateOfBirth);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'acceptClaimDate', 'required', context, {
        summary: 'offered-claim-date:field.acceptClaimDate.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { acceptClaimDate: 'test-value' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'acceptClaimDate', 'required', context);
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { acceptClaimDate: 'bad-value' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'acceptClaimDate', 'inArray', context, {
        summary: 'offered-claim-date:field.acceptClaimDate.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { acceptClaimDate: 'yes' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'acceptClaimDate', 'inArray', context);
    });

    it('should pass "inArray" validator if value is no', async () => {
      const context = new JourneyContext({ ...dateOfBirth, [waypoint]: { acceptClaimDate: 'no' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'acceptClaimDate', 'inArray', context);
    });
  });
});
