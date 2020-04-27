const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-partner/sponsorship-details.js');

const longString = 'x'.repeat(501);
const exactString = 'x'.repeat(500);

describe('Validators: partner-sponsorship-details', () => {
  describe('field: partnerSponsorName', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerSponsorName', 'required', null, {
        summary: 'partner-sponsorship-details:field.partnerSponsorName.required',
      });
    });

    it('should fail "strlen" validator if value > 500 chars', async () => {
      await expectValidatorToFail(validators, 'partnerSponsorName', 'strlen', { partnerSponsorName: longString }, {
        summary: 'partner-sponsorship-details:field.partnerSponsorName.strlen',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerSponsorName', 'required', { partnerSponsorName: 'test-value' });
    });

    it('should pass "strlen" validator if value < 500 chars is provided', async () => {
      await expectValidatorToPass(validators, 'partnerSponsorName', 'strlen', { partnerSponsorName: exactString });
    });
  });

  describe('field: partnerHomeOfficeReference', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerHomeOfficeReference', 'required', null, {
        summary: 'partner-sponsorship-details:field.partnerHomeOfficeReference.required',
      });
    });

    it('should fail "strlen" validator if value > 500 chars', async () => {
      await expectValidatorToFail(validators, 'partnerHomeOfficeReference', 'strlen', { partnerHomeOfficeReference: longString }, {
        summary: 'partner-sponsorship-details:field.partnerHomeOfficeReference.strlen',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerHomeOfficeReference', 'required', { partnerHomeOfficeReference: 'test-value' });
    });

    it('should pass "strlen" validator if value < 500 chars is provided', async () => {
      await expectValidatorToPass(validators, 'partnerHomeOfficeReference', 'strlen', { partnerHomeOfficeReference: exactString });
    });
  });

  describe('field: partnerSponsorshipUndertakingSigned', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerSponsorshipUndertakingSigned', 'required', null, {
        summary: 'partner-sponsorship-details:field.partnerSponsorshipUndertakingSigned.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerSponsorshipUndertakingSigned', 'required', { partnerSponsorshipUndertakingSigned: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should fail "dateObject" validator if value is not a valid date', async () => {
      await expectValidatorToFail(validators, 'partnerSponsorshipUndertakingSigned', 'dateObject', { partnerSponsorshipUndertakingSigned: 'invalid-input' }, {
        summary: 'partner-sponsorship-details:field.partnerSponsorshipUndertakingSigned.format',
      });
    });
  });
});
