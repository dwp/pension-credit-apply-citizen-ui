const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../../lib/constants.js');
const { expectValidatorToFail, expectValidatorToFailWithJourney, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/income/employment.js');

const waypoint = WP.EMPLOYMENT;

const liveWithPartner = {
  [WP.LIVE_WITH_PARTNER]: {
    havePartner: 'yesLiveTogether',
  },
};

describe('Validators: employment', () => {
  describe('field: hasEmploymentIncome', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'hasEmploymentIncome', 'required', null, {
        summary: 'employment:field.hasEmploymentIncome.requiredSingle',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'hasEmploymentIncome', 'required', { hasEmploymentIncome: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'hasEmploymentIncome', 'inArray', { hasEmploymentIncome: 'bad-value' }, {
        summary: 'employment:field.hasEmploymentIncome.requiredSingle',
      });
    });

    it('should fail "inArray" validator if value is not one of the valid options with Joint suffix', async () => {
      const context = new JourneyContext({ ...liveWithPartner, [waypoint]: { hasEmploymentIncome: 'bad-value' } });
      await expectValidatorToFailWithJourney(validators, waypoint, 'hasEmploymentIncome', 'inArray', context, {
        summary: 'employment:field.hasEmploymentIncome.requiredJoint',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'hasEmploymentIncome', 'inArray', { hasEmploymentIncome: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'hasEmploymentIncome', 'inArray', { hasEmploymentIncome: 'no' });
    });
  });
});
