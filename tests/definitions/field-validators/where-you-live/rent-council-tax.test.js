const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../../lib/constants.js');
const assert = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/rent-council-tax.js');

const waypoint = WP.LIVES_WITH_YOU;
const liveWithPartner = {
  [WP.LIVE_WITH_PARTNER]: {
    liveWithPartner: 'yes',
  },
};

describe('Validators: rent-council-tax', () => {
  describe('field: responsibleForCouncilTax', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await assert.expectValidatorToFail(validators, 'responsibleForCouncilTax', 'required', null, {
        summary: 'rent-council-tax:field.responsibleForCouncilTax.requiredSingle',
      });
    });

    it('should fail "required" validator if no value is provided with joint message if liveWithPartner is "yes"', async () => {
      const context = new JourneyContext(liveWithPartner);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'responsibleForCouncilTax', 'required', context, {
        summary: 'rent-council-tax:field.responsibleForCouncilTax.requiredJoint',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await assert.expectValidatorToPass(validators, 'responsibleForCouncilTax', 'required', { responsibleForCouncilTax: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await assert.expectValidatorToFail(validators, 'responsibleForCouncilTax', 'inArray', { responsibleForCouncilTax: 'bad-value' }, {
        summary: 'rent-council-tax:field.responsibleForCouncilTax.requiredSingle',
      });
    });

    it('should fail "inArray" validator if value is not one of the valid options with joint message if liveWithPartner is "yes"', async () => {
      const context = new JourneyContext({
        ...liveWithPartner,
        [waypoint]: { responsibleForCouncilTax: 'bad-value' },
      });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'responsibleForCouncilTax', 'inArray', context, {
        summary: 'rent-council-tax:field.responsibleForCouncilTax.requiredJoint',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await assert.expectValidatorToPass(validators, 'responsibleForCouncilTax', 'inArray', { responsibleForCouncilTax: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await assert.expectValidatorToPass(validators, 'responsibleForCouncilTax', 'inArray', { responsibleForCouncilTax: 'no' });
    });
  });
});
