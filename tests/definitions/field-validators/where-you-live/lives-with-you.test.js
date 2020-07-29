const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../../lib/constants.js');
const assert = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/lives-with-you.js');

const waypoint = WP.LIVES_WITH_YOU;
const liveWithPartner = {
  [WP.LIVE_WITH_PARTNER]: {
    havePartner: 'yesLiveTogether',
  },
};

describe('Validators: lives-with-you', () => {
  describe('field: othersLiveWithYou', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await assert.expectValidatorToFail(validators, 'othersLiveWithYou', 'required', null, {
        summary: 'lives-with-you:field.othersLiveWithYou.requiredSingle',
      });
    });

    it('should fail "required" validator if no value is provided with joint message if havePartner is "yesLiveTogether"', async () => {
      const context = new JourneyContext(liveWithPartner);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'othersLiveWithYou', 'required', context, {
        summary: 'lives-with-you:field.othersLiveWithYou.requiredJoint',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await assert.expectValidatorToPass(validators, 'othersLiveWithYou', 'required', { othersLiveWithYou: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await assert.expectValidatorToFail(validators, 'othersLiveWithYou', 'inArray', { othersLiveWithYou: 'bad-value' }, {
        summary: 'lives-with-you:field.othersLiveWithYou.requiredSingle',
      });
    });

    it('should fail "inArray" validator if value is not one of the valid options with joint message if havePartner is "yesLiveTogether"', async () => {
      const context = new JourneyContext({
        ...liveWithPartner,
        [waypoint]: { othersLiveWithYou: 'bad-value' },
      });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'othersLiveWithYou', 'inArray', context, {
        summary: 'lives-with-you:field.othersLiveWithYou.requiredJoint',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await assert.expectValidatorToPass(validators, 'othersLiveWithYou', 'inArray', { othersLiveWithYou: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await assert.expectValidatorToPass(validators, 'othersLiveWithYou', 'inArray', { othersLiveWithYou: 'no' });
    });
  });

  describe('field: othersLiveWithYouDetails', () => {
    it('should pass "required" validator if no value is provided and othersLiveWithYou is "no"', async () => {
      await assert.expectValidatorToPass(validators, 'othersLiveWithYouDetails', 'required', { othersLiveWithYou: 'no' });
    });

    it('should fail "required" validator if no value is provided and othersLiveWithYou is "yes"', async () => {
      await assert.expectValidatorToFail(validators, 'othersLiveWithYouDetails', 'required', { othersLiveWithYou: 'yes' }, {
        summary: 'lives-with-you:field.othersLiveWithYouDetails.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and othersLiveWithYou is "yes"', async () => {
      await assert.expectValidatorToPass(validators, 'othersLiveWithYouDetails', 'required', { othersLiveWithYou: 'yes', othersLiveWithYouDetails: 'Hammond Eggs' });
    });

    it('should pass "strlen" validator if string length > 500 and othersLiveWithYou is "no"', async () => {
      const longString = Array(502).join('x');
      await assert.expectValidatorToPass(validators, 'othersLiveWithYouDetails', 'required', { othersLiveWithYou: 'no', othersLiveWithYouDetails: longString });
    });

    it('should fail "strlen" validator if string length > 500 and othersLiveWithYou is "yes"', async () => {
      const longString = Array(502).join('x');
      await assert.expectValidatorToFail(validators, 'othersLiveWithYouDetails', 'strlen', { othersLiveWithYou: 'yes', othersLiveWithYouDetails: longString }, {
        summary: 'lives-with-you:field.othersLiveWithYouDetails.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and othersLiveWithYou is "yes"', async () => {
      const longString = Array(501).join('x');
      await assert.expectValidatorToPass(validators, 'othersLiveWithYouDetails', 'strlen', { othersLiveWithYou: 'yes', othersLiveWithYouDetails: longString });
    });
  });
});
