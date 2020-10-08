const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../../lib/constants.js');
const assert = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/income/earnings.js');

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

const dateOfClaimFuture = {
  [WP.OFFERED_CLAIM_DATE]: {
    acceptClaimDate: 'yes',
  },
  [WP.DATE_OF_BIRTH]: {
    dateOfBirth: { dd: '01', mm: '01', yyyy: '2020' },
  },
};

describe('Validators: earnings', () => {
  describe('field: hasEmploymentIncome', () => {
    it('should fail "required" validator if no value is provided', async () => {
      const context = new JourneyContext(dateOfClaimPast);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'hasEmploymentIncome', 'required', context, {
        summary: 'earnings:field.hasEmploymentIncome.requiredSingle',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      const context = new JourneyContext({ ...dateOfClaimPast, [waypoint]: { hasEmploymentIncome: 'test-value' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'hasEmploymentIncome', 'required', context);
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      const context = new JourneyContext({ ...dateOfClaimPast, [waypoint]: { hasEmploymentIncome: 'bad-value' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'hasEmploymentIncome', 'inArray', context, {
        summary: 'earnings:field.hasEmploymentIncome.requiredSingle',
      });
    });

    it('should fail "inArray" validator if value is not one of the valid options with Joint suffix', async () => {
      const context = new JourneyContext({ ...liveWithPartner, ...dateOfClaimPast, [waypoint]: { hasEmploymentIncome: 'bad-value' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'hasEmploymentIncome', 'inArray', context, {
        summary: 'earnings:field.hasEmploymentIncome.requiredJoint',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      const context = new JourneyContext({ ...dateOfClaimPast, [waypoint]: { hasEmploymentIncome: 'yes' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'hasEmploymentIncome', 'inArray', context);
    });

    it('should pass "inArray" validator if value is no', async () => {
      const context = new JourneyContext({ ...dateOfClaimPast, [waypoint]: { hasEmploymentIncome: 'no' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'hasEmploymentIncome', 'inArray', context);
    });
  });

  describe('field: hasSelfEmploymentIncome', () => {
    it('should fail "required" validator if no value is provided', async () => {
      const context = new JourneyContext(dateOfClaimPast);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'required', context, {
        summary: 'earnings:field.hasSelfEmploymentIncome.requiredSinglePast',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      const context = new JourneyContext({ ...dateOfClaimPast, [waypoint]: { hasSelfEmploymentIncome: 'test-value' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'required', context);
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      const context = new JourneyContext({ ...dateOfClaimPast, [waypoint]: { hasSelfEmploymentIncome: 'bad-value' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'inArray', context, {
        summary: 'earnings:field.hasSelfEmploymentIncome.requiredSinglePast',
      });
    });

    it('should fail "inArray" validator if value is not one of the valid options with Joint suffix', async () => {
      const context = new JourneyContext({ ...liveWithPartner, ...dateOfClaimPast, [waypoint]: { hasSelfEmploymentIncome: 'bad-value' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'inArray', context, {
        summary: 'earnings:field.hasSelfEmploymentIncome.requiredJointPast',
      });
    });

    it('should fail "inArray" validator if value is not one of the valid options with Present suffix', async () => {
      const context = new JourneyContext({ ...dateOfClaimFuture, [waypoint]: { hasSelfEmploymentIncome: 'bad-value' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'inArray', context, {
        summary: 'earnings:field.hasSelfEmploymentIncome.requiredSinglePresent',
      });
    });

    it('should fail "inArray" validator if value is not one of the valid options with Present and Joint suffix', async () => {
      const context = new JourneyContext({ ...liveWithPartner, ...dateOfClaimFuture, [waypoint]: { hasSelfEmploymentIncome: 'bad-value' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'hasSelfEmploymentIncome', 'inArray', context, {
        summary: 'earnings:field.hasSelfEmploymentIncome.requiredJointPresent',
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
