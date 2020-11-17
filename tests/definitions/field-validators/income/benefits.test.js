const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/income/benefits.js');

describe('Validators: benefits', () => {
  describe('field: waitingToHearAboutBenefits', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'waitingToHearAboutBenefits', 'required', null, {
        summary: 'benefits:field.waitingToHearAboutBenefits.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'waitingToHearAboutBenefits', 'required', { waitingToHearAboutBenefits: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'waitingToHearAboutBenefits', 'inArray', { waitingToHearAboutBenefits: 'bad-value' }, {
        summary: 'benefits:field.waitingToHearAboutBenefits.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'waitingToHearAboutBenefits', 'inArray', { waitingToHearAboutBenefits: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'waitingToHearAboutBenefits', 'inArray', { waitingToHearAboutBenefits: 'no' });
    });
  });

  describe('field: benefitsDetails', () => {
    it('should pass "required" validator if no value is provided and waitingToHearAboutBenefits is "no"', async () => {
      await expectValidatorToPass(validators, 'benefitsDetails', 'required', { waitingToHearAboutBenefits: 'no' });
    });

    it('should fail "required" validator if no value is provided and waitingToHearAboutBenefits is "yes"', async () => {
      await expectValidatorToFail(validators, 'benefitsDetails', 'required', { waitingToHearAboutBenefits: 'yes' }, {
        summary: 'benefits:field.benefitsDetails.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and waitingToHearAboutBenefits is "yes"', async () => {
      await expectValidatorToPass(validators, 'benefitsDetails', 'required', { waitingToHearAboutBenefits: 'yes', benefitsDetails: 'Carer’s Allowance' });
    });

    it('should pass "strlen" validator if string length > 500 and waitingToHearAboutBenefits is "no"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'benefitsDetails', 'required', { waitingToHearAboutBenefits: 'no', benefitsDetails: longString });
    });

    it('should fail "strlen" validator if string length > 500 and waitingToHearAboutBenefits is "yes"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'benefitsDetails', 'strlen', { waitingToHearAboutBenefits: 'yes', benefitsDetails: longString }, {
        summary: 'benefits:field.benefitsDetails.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and waitingToHearAboutBenefits is "yes"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'benefitsDetails', 'strlen', { waitingToHearAboutBenefits: 'yes', benefitsDetails: longString });
    });
  });
});
