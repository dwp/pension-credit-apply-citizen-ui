const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../../lib/constants.js');
const assert = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/income/self-employment.js');

const waypoint = WP.EARNINGS;

const liveWithPartner = {
  [WP.LIVE_WITH_PARTNER]: {
    havePartner: 'yesLiveTogether',
  },
};

const dateOfClaimPast = {
  [WP.OFFERED_CLAIM_DATE]: {
    acceptClaimDate: 'yes',
  },
  [WP.DATE_OF_BIRTH]: {
    dateOfBirth: { dd: '01', mm: '01', yyyy: '1920' },
  },
};

describe('Validators: self-employment', () => {
  describe('field: hasSelfEmploymentIncome', () => {
    it('should fail "required" validator if no value is provided', async () => {
      const context = new JourneyContext(dateOfClaimPast);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'required', context, {
        summary: 'self-employment:field.hasSelfEmploymentIncome.requiredSinglePast',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      const context = new JourneyContext({ ...dateOfClaimPast, [waypoint]: { hasSelfEmploymentIncome: 'test-value' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'required', context);
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      const context = new JourneyContext({ ...dateOfClaimPast, [waypoint]: { hasSelfEmploymentIncome: 'bad-value' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'inArray', context, {
        summary: 'self-employment:field.hasSelfEmploymentIncome.requiredSinglePast',
      });
    });

    it('should fail "inArray" validator if value is not one of the valid options with Joint suffix', async () => {
      const context = new JourneyContext({ ...liveWithPartner, ...dateOfClaimPast, [waypoint]: { hasSelfEmploymentIncome: 'bad-value' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'inArray', context, {
        summary: 'self-employment:field.hasSelfEmploymentIncome.requiredJointPast',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      const context = new JourneyContext({ ...dateOfClaimPast, [waypoint]: { hasSelfEmploymentIncome: 'yes' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'inArray', context);
    });

    it('should pass "inArray" validator if value is no', async () => {
      const context = new JourneyContext({ ...dateOfClaimPast, [waypoint]: { hasSelfEmploymentIncome: 'no' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'inArray', context);
    });
  });
});
