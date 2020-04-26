const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-citizen/asylum-seeker.js');

describe('Validators: asylum-seeker', () => {
  describe('field: asylumSeeker', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'asylumSeeker', 'required', null, {
        summary: 'asylum-seeker:field.asylumSeeker.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'asylumSeeker', 'required', { asylumSeeker: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'asylumSeeker', 'inArray', { asylumSeeker: 'bad-value' }, {
        summary: 'asylum-seeker:field.asylumSeeker.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'asylumSeeker', 'inArray', { asylumSeeker: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'asylumSeeker', 'inArray', { asylumSeeker: 'no' });
    });
  });

  describe('field: asylumBefore3April2000', () => {
    it('should pass "required" validator if no value is provided and asylumSeeker is no', async () => {
      await expectValidatorToPass(validators, 'asylumBefore3April2000', 'required', { asylumSeeker: 'no' });
    });

    it('should fail "required" validator if no value is provided and asylumSeeker is yes', async () => {
      await expectValidatorToFail(validators, 'asylumBefore3April2000', 'required', { asylumSeeker: 'yes' }, {
        summary: 'asylum-seeker:field.asylumBefore3April2000.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'asylumBefore3April2000', 'required', { asylumSeeker: 'yes', asylumBefore3April2000: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'asylumBefore3April2000', 'inArray', { asylumSeeker: 'yes', asylumBefore3April2000: 'bad-value' }, {
        summary: 'asylum-seeker:field.asylumBefore3April2000.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'asylumBefore3April2000', 'inArray', { asylumSeeker: 'yes', asylumBefore3April2000: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'asylumBefore3April2000', 'inArray', { asylumSeeker: 'yes', asylumBefore3April2000: 'no' });
    });
  });

  describe('field: successfulDecision', () => {
    it('should pass "required" validator if no value is provided and asylumSeeker is no', async () => {
      await expectValidatorToPass(validators, 'successfulDecision', 'required', { asylumSeeker: 'no' });
    });

    it('should fail "required" validator if no value is provided and asylumSeeker is yes', async () => {
      await expectValidatorToFail(validators, 'successfulDecision', 'required', { asylumSeeker: 'yes' }, {
        summary: 'asylum-seeker:field.successfulDecision.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'successfulDecision', 'required', { asylumSeeker: 'yes', successfulDecision: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'successfulDecision', 'inArray', { asylumSeeker: 'yes', successfulDecision: 'bad-value' }, {
        summary: 'asylum-seeker:field.successfulDecision.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'successfulDecision', 'inArray', { asylumSeeker: 'yes', successfulDecision: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'successfulDecision', 'inArray', { asylumSeeker: 'yes', successfulDecision: 'no' });
    });
  });

  describe('field: successfulDecisionDate', () => {
    let _now;

    before(() => {
      _now = Date.now;
    });

    after(() => {
      Date.now = _now;
    });

    it('should pass "required" validator if no value is provided and successfulDecision is no', async () => {
      await expectValidatorToPass(validators, 'successfulDecisionDate', 'required', { successfulDecision: 'no' });
    });

    it('should fail "required" validator if no value is provided and successfulDecision is yes', async () => {
      await expectValidatorToFail(validators, 'successfulDecisionDate', 'required', { successfulDecision: 'yes' }, {
        summary: 'asylum-seeker:field.successfulDecisionDate.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided and successfulDecision is yes', async () => {
      await expectValidatorToPass(validators, 'successfulDecisionDate', 'required', { successfulDecision: 'yes', successfulDecisionDate: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should pass "dateObject" validator if value is not a valid date but successfulDecision is no', async () => {
      await expectValidatorToPass(validators, 'successfulDecisionDate', 'dateObject', { successfulDecision: 'no', successfulDecisionDate: 'invalid-input' });
    });

    it('should fail "dateObject" validator if value is not a valid date and successfulDecision is yes', async () => {
      await expectValidatorToFail(validators, 'successfulDecisionDate', 'dateObject', { successfulDecision: 'yes', successfulDecisionDate: 'invalid-input' }, {
        summary: 'asylum-seeker:field.successfulDecisionDate.format',
      });
    });
  });

  describe('field: supportedByHomeOffice', () => {
    it('should pass "required" validator if no value is provided and asylumSeeker is no', async () => {
      await expectValidatorToPass(validators, 'supportedByHomeOffice', 'required', { asylumSeeker: 'no' });
    });

    it('should fail "required" validator if no value is provided and asylumSeeker is yes', async () => {
      await expectValidatorToFail(validators, 'supportedByHomeOffice', 'required', { asylumSeeker: 'yes' }, {
        summary: 'asylum-seeker:field.supportedByHomeOffice.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'supportedByHomeOffice', 'required', { asylumSeeker: 'yes', supportedByHomeOffice: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'supportedByHomeOffice', 'inArray', { asylumSeeker: 'yes', supportedByHomeOffice: 'bad-value' }, {
        summary: 'asylum-seeker:field.supportedByHomeOffice.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'supportedByHomeOffice', 'inArray', { asylumSeeker: 'yes', supportedByHomeOffice: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'supportedByHomeOffice', 'inArray', { asylumSeeker: 'yes', supportedByHomeOffice: 'no' });
    });
  });
});
