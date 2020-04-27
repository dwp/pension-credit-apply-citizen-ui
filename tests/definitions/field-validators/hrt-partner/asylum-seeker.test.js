const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-partner/asylum-seeker.js');

describe('Validators: partner-asylum-seeker', () => {
  describe('field: partnerAsylumSeeker', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerAsylumSeeker', 'required', null, {
        summary: 'partner-asylum-seeker:field.partnerAsylumSeeker.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumSeeker', 'required', { partnerAsylumSeeker: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerAsylumSeeker', 'inArray', { partnerAsylumSeeker: 'bad-value' }, {
        summary: 'partner-asylum-seeker:field.partnerAsylumSeeker.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumSeeker', 'inArray', { partnerAsylumSeeker: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumSeeker', 'inArray', { partnerAsylumSeeker: 'no' });
    });
  });

  describe('field: partnerAsylumBefore3April2000', () => {
    it('should pass "required" validator if no value is provided and partnerAsylumSeeker is no', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumBefore3April2000', 'required', { partnerAsylumSeeker: 'no' });
    });

    it('should fail "required" validator if no value is provided and partnerAsylumSeeker is yes', async () => {
      await expectValidatorToFail(validators, 'partnerAsylumBefore3April2000', 'required', { partnerAsylumSeeker: 'yes' }, {
        summary: 'partner-asylum-seeker:field.partnerAsylumBefore3April2000.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumBefore3April2000', 'required', { partnerAsylumSeeker: 'yes', partnerAsylumBefore3April2000: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerAsylumBefore3April2000', 'inArray', { partnerAsylumSeeker: 'yes', partnerAsylumBefore3April2000: 'bad-value' }, {
        summary: 'partner-asylum-seeker:field.partnerAsylumBefore3April2000.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumBefore3April2000', 'inArray', { partnerAsylumSeeker: 'yes', partnerAsylumBefore3April2000: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumBefore3April2000', 'inArray', { partnerAsylumSeeker: 'yes', partnerAsylumBefore3April2000: 'no' });
    });
  });

  describe('field: partnerSuccessfulDecision', () => {
    it('should pass "required" validator if no value is provided and partnerAsylumSeeker is no', async () => {
      await expectValidatorToPass(validators, 'partnerSuccessfulDecision', 'required', { partnerAsylumSeeker: 'no' });
    });

    it('should fail "required" validator if no value is provided and partnerAsylumSeeker is yes', async () => {
      await expectValidatorToFail(validators, 'partnerSuccessfulDecision', 'required', { partnerAsylumSeeker: 'yes' }, {
        summary: 'partner-asylum-seeker:field.partnerSuccessfulDecision.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerSuccessfulDecision', 'required', { partnerAsylumSeeker: 'yes', partnerSuccessfulDecision: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerSuccessfulDecision', 'inArray', { partnerAsylumSeeker: 'yes', partnerSuccessfulDecision: 'bad-value' }, {
        summary: 'partner-asylum-seeker:field.partnerSuccessfulDecision.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerSuccessfulDecision', 'inArray', { partnerAsylumSeeker: 'yes', partnerSuccessfulDecision: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerSuccessfulDecision', 'inArray', { partnerAsylumSeeker: 'yes', partnerSuccessfulDecision: 'no' });
    });
  });

  describe('field: partnerSuccessfulDecisionDate', () => {
    let _now;

    before(() => {
      _now = Date.now;
    });

    after(() => {
      Date.now = _now;
    });

    it('should pass "required" validator if no value is provided and partnerSuccessfulDecision is no', async () => {
      await expectValidatorToPass(validators, 'partnerSuccessfulDecisionDate', 'required', { partnerSuccessfulDecision: 'no' });
    });

    it('should fail "required" validator if no value is provided and partnerSuccessfulDecision is yes', async () => {
      await expectValidatorToFail(validators, 'partnerSuccessfulDecisionDate', 'required', { partnerSuccessfulDecision: 'yes' }, {
        summary: 'partner-asylum-seeker:field.partnerSuccessfulDecisionDate.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided and partnerSuccessfulDecision is yes', async () => {
      await expectValidatorToPass(validators, 'partnerSuccessfulDecisionDate', 'required', { partnerSuccessfulDecision: 'yes', partnerSuccessfulDecisionDate: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should pass "dateObject" validator if value is not a valid date but partnerSuccessfulDecision is no', async () => {
      await expectValidatorToPass(validators, 'partnerSuccessfulDecisionDate', 'dateObject', { partnerSuccessfulDecision: 'no', partnerSuccessfulDecisionDate: 'invalid-input' });
    });

    it('should fail "dateObject" validator if value is not a valid date and partnerSuccessfulDecision is yes', async () => {
      await expectValidatorToFail(validators, 'partnerSuccessfulDecisionDate', 'dateObject', { partnerSuccessfulDecision: 'yes', partnerSuccessfulDecisionDate: 'invalid-input' }, {
        summary: 'partner-asylum-seeker:field.partnerSuccessfulDecisionDate.format',
      });
    });
  });

  describe('field: partnerSupportedByHomeOffice', () => {
    it('should pass "required" validator if no value is provided and partnerAsylumSeeker is no', async () => {
      await expectValidatorToPass(validators, 'partnerSupportedByHomeOffice', 'required', { partnerAsylumSeeker: 'no' });
    });

    it('should fail "required" validator if no value is provided and partnerAsylumSeeker is yes', async () => {
      await expectValidatorToFail(validators, 'partnerSupportedByHomeOffice', 'required', { partnerAsylumSeeker: 'yes' }, {
        summary: 'partner-asylum-seeker:field.partnerSupportedByHomeOffice.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerSupportedByHomeOffice', 'required', { partnerAsylumSeeker: 'yes', partnerSupportedByHomeOffice: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerSupportedByHomeOffice', 'inArray', { partnerAsylumSeeker: 'yes', partnerSupportedByHomeOffice: 'bad-value' }, {
        summary: 'partner-asylum-seeker:field.partnerSupportedByHomeOffice.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerSupportedByHomeOffice', 'inArray', { partnerAsylumSeeker: 'yes', partnerSupportedByHomeOffice: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerSupportedByHomeOffice', 'inArray', { partnerAsylumSeeker: 'yes', partnerSupportedByHomeOffice: 'no' });
    });
  });
});
