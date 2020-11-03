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

  describe('field: employerDetails', () => {
    it('should pass "required" validator if no value is provided and hasEmploymentIncome is "no"', async () => {
      await expectValidatorToPass(validators, 'employerDetails', 'required', { hasEmploymentIncome: 'no' });
    });

    it('should fail "required" validator if no value is provided and hasEmploymentIncome is "yes"', async () => {
      await expectValidatorToFail(validators, 'employerDetails', 'required', { hasEmploymentIncome: 'yes' }, {
        summary: 'employment:field.employerDetails.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and hasEmploymentIncome is "yes"', async () => {
      await expectValidatorToPass(validators, 'employerDetails', 'required', { hasEmploymentIncome: 'yes', employerDetails: 'Hammond Eggs' });
    });

    it('should pass "strlen" validator if string length > 500 and hasEmploymentIncome is "no"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'employerDetails', 'required', { hasEmploymentIncome: 'no', employerDetails: longString });
    });

    it('should fail "strlen" validator if string length > 500 and hasEmploymentIncome is "yes"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'employerDetails', 'strlen', { hasEmploymentIncome: 'yes', employerDetails: longString }, {
        summary: 'employment:field.employerDetails.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and hasEmploymentIncome is "yes"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'employerDetails', 'strlen', { hasEmploymentIncome: 'yes', employerDetails: longString });
    });
  });
});
