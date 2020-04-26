const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-citizen/sponsorship-details.js');

const longString = 'x'.repeat(501);
const exactString = 'x'.repeat(500);

describe('Validators: sponsorship-details', () => {
  describe('field: sponsorName', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'sponsorName', 'required', null, {
        summary: 'sponsorship-details:field.sponsorName.required',
      });
    });

    it('should fail "strlen" validator if value > 500 chars', async () => {
      await expectValidatorToFail(validators, 'sponsorName', 'strlen', { sponsorName: longString }, {
        summary: 'sponsorship-details:field.sponsorName.strlen',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'sponsorName', 'required', { sponsorName: 'test-value' });
    });

    it('should pass "strlen" validator if value < 500 chars is provided', async () => {
      await expectValidatorToPass(validators, 'sponsorName', 'strlen', { sponsorName: exactString });
    });
  });

  describe('field: homeOfficeReference', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'homeOfficeReference', 'required', null, {
        summary: 'sponsorship-details:field.homeOfficeReference.required',
      });
    });

    it('should fail "strlen" validator if value > 500 chars', async () => {
      await expectValidatorToFail(validators, 'homeOfficeReference', 'strlen', { homeOfficeReference: longString }, {
        summary: 'sponsorship-details:field.homeOfficeReference.strlen',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'homeOfficeReference', 'required', { homeOfficeReference: 'test-value' });
    });

    it('should pass "strlen" validator if value < 500 chars is provided', async () => {
      await expectValidatorToPass(validators, 'homeOfficeReference', 'strlen', { homeOfficeReference: exactString });
    });
  });

  describe('field: sponsorshipUndertakingSigned', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'sponsorshipUndertakingSigned', 'required', null, {
        summary: 'sponsorship-details:field.sponsorshipUndertakingSigned.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'sponsorshipUndertakingSigned', 'required', { sponsorshipUndertakingSigned: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should fail "dateObject" validator if value is not a valid date', async () => {
      await expectValidatorToFail(validators, 'sponsorshipUndertakingSigned', 'dateObject', { sponsorshipUndertakingSigned: 'invalid-input' }, {
        summary: 'sponsorship-details:field.sponsorshipUndertakingSigned.format',
      });
    });
  });
});
