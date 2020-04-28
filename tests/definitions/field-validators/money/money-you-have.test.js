const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../../lib/constants.js');
const assert = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/money/money-you-have.js');

const waypoint = WP.MONEY_YOU_HAVE;
const needToBackDate = {
  [WP.DATE_OF_CLAIM]: {
    dateOfClaim: { dd: '01', mm: '01', yyyy: '2019' },
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
      const context = new JourneyContext({
        ...needToBackDate,
        [waypoint]: { moneyBackdated: '1.23' },
      });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'moneyBackdated', 'required', context);
    });

    it('should fail "isValidMoney" validator if format is invalid', async () => {
      const context = new JourneyContext({
        ...needToBackDate,
        [waypoint]: { moneyBackdated: '$Bad Balance$' },
      });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'moneyBackdated', 'isValidMoney', context, {
        summary: 'money-you-have:field.moneyBackdated.format',
      });
    });

    it('should fail "isValidMoney" validator if input is not to 2 decimal places', async () => {
      const context1 = new JourneyContext({
        ...needToBackDate,
        [waypoint]: { moneyBackdated: '1' },
      });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'moneyBackdated', 'isValidMoney', context1, {
        summary: 'money-you-have:field.moneyBackdated.format',
      });

      const context2 = new JourneyContext({
        ...needToBackDate,
        [waypoint]: { moneyBackdated: '1.5' },
      });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'moneyBackdated', 'isValidMoney', context2, {
        summary: 'money-you-have:field.moneyBackdated.format',
      });
    });

    it('should pass "isValidMoney" validator if input is valid', async () => {
      const context = new JourneyContext({
        ...needToBackDate,
        [waypoint]: {
          moneyBackdated: '1.23',
        },
      });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'moneyBackdated', 'isValidMoney', context);
    });

    it('should ignore validation if no need to backdate', async () => {
      await assert.expectValidatorToPass(validators, 'moneyBackdated', 'required', {});
      await assert.expectValidatorToPass(validators, 'moneyBackdated', 'regex', {});
    });
  });

  describe('field: moneyToday', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await assert.expectValidatorToFail(validators, 'moneyToday', 'required', null, {
        summary: 'money-you-have:field.moneyToday.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await assert.expectValidatorToPass(validators, 'moneyToday', 'required', { moneyToday: 'test' });
    });

    it('should fail "isValidMoney" validator if format is invalid', async () => {
      await assert.expectValidatorToFail(validators, 'moneyToday', 'isValidMoney', { moneyToday: '$Bad Balance$' }, {
        summary: 'money-you-have:field.moneyToday.format',
      });
    });

    it('should fail "isValidMoney" validator if input is not to 2 decimal places', async () => {
      await assert.expectValidatorToFail(validators, 'moneyToday', 'isValidMoney', { moneyToday: '1' }, {
        summary: 'money-you-have:field.moneyToday.format',
      });
      await assert.expectValidatorToFail(validators, 'moneyToday', 'isValidMoney', { moneyToday: '1.5' }, {
        summary: 'money-you-have:field.moneyToday.format',
      });
    });

    it('should pass "isValidMoney" validator if input is valid', async () => {
      await assert.expectValidatorToPass(validators, 'moneyToday', 'isValidMoney', { moneyToday: '1.23' });
    });
  });
});
