const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../../lib/constants.js');
const assert = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/money/money-you-have.js');

const waypoint = WP.MONEY_YOU_HAVE;

const acceptedDateOfClaim = {
  [WP.OFFERED_CLAIM_DATE]: {
    acceptClaimDate: 'yes',
  },
};

const needToBackDate = {
  ...acceptedDateOfClaim,
  [WP.DATE_OF_BIRTH]: {
    dateOfBirth: { dd: '01', mm: '01', yyyy: '1920' },
  },
};
const noNeedToBackDate = {
  ...acceptedDateOfClaim,
  [WP.DATE_OF_BIRTH]: {
    dateOfBirth: { dd: '01', mm: '01', yyyy: '2020' },
  },
};

describe('Validators: money-you-have', () => {
  describe('field: moneyBackdated', () => {
    it('should fail "required" validator if no value is provided', async () => {
      const context = new JourneyContext(needToBackDate);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'moneyBackdated', 'required', context, {
        summary: 'money-you-have:field.moneyBackdated.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      const context = new JourneyContext({ ...needToBackDate, [waypoint]: { moneyBackdated: '1.23' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'moneyBackdated', 'required', context);
    });

    it('should fail "isValidMoney" validator if format is invalid', async () => {
      const context = new JourneyContext({ ...needToBackDate, [waypoint]: { moneyBackdated: '$Bad Balance$' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'moneyBackdated', 'isValidMoney', context, {
        summary: 'money-you-have:field.moneyBackdated.format',
      });
    });

    it('should pass "isValidMoney" validator if input is valid', async () => {
      const context = new JourneyContext({ ...needToBackDate, [waypoint]: { moneyBackdated: '1.23' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'moneyBackdated', 'isValidMoney', context);
    });

    it('should ignore validation if no need to backdate', async () => {
      const context = new JourneyContext(noNeedToBackDate);
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'moneyBackdated', 'required', context);
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'moneyBackdated', 'regex', context);
    });
  });

  describe('field: moneyToday', () => {
    it('should fail "required" validator if no value is provided', async () => {
      const context = new JourneyContext(noNeedToBackDate);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'moneyToday', 'required', context, {
        summary: 'money-you-have:field.moneyToday.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      const context = new JourneyContext({ ...noNeedToBackDate, [waypoint]: { moneyToday: 'test' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'moneyToday', 'required', context);
    });

    it('should fail "isValidMoney" validator if format is invalid', async () => {
      const context = new JourneyContext({ ...noNeedToBackDate, [waypoint]: { moneyToday: '$Bad Balance$' } });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'moneyToday', 'isValidMoney', context, {
        summary: 'money-you-have:field.moneyToday.format',
      });
    });

    it('should pass "isValidMoney" validator if input is valid', async () => {
      const context = new JourneyContext({ ...noNeedToBackDate, [waypoint]: { moneyToday: '1.23' } });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'moneyToday', 'isValidMoney', context);
    });
  });
});
