const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-partner/asylum-application.js');

describe('Validators: partner-asylum-application', () => {
  describe('field: partnerAsylumBefore3April2000', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerAsylumBefore3April2000', 'required', {}, {
        summary: 'partner-asylum-application:field.partnerAsylumBefore3April2000.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumBefore3April2000', 'required', { partnerAsylumBefore3April2000: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerAsylumBefore3April2000', 'inArray', { partnerAsylumBefore3April2000: 'bad-value' }, {
        summary: 'partner-asylum-application:field.partnerAsylumBefore3April2000.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumBefore3April2000', 'inArray', { partnerAsylumBefore3April2000: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerAsylumBefore3April2000', 'inArray', { partnerAsylumBefore3April2000: 'no' });
    });
  });

  describe('field: partnerSuccessfulDecision', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerSuccessfulDecision', 'required', {}, {
        summary: 'partner-asylum-application:field.partnerSuccessfulDecision.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerSuccessfulDecision', 'required', { partnerSuccessfulDecision: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerSuccessfulDecision', 'inArray', { partnerSuccessfulDecision: 'bad-value' }, {
        summary: 'partner-asylum-application:field.partnerSuccessfulDecision.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerSuccessfulDecision', 'inArray', { partnerSuccessfulDecision: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerSuccessfulDecision', 'inArray', { partnerSuccessfulDecision: 'no' });
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
        summary: 'partner-asylum-application:field.partnerSuccessfulDecisionDate.required',
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
        summary: 'partner-asylum-application:field.partnerSuccessfulDecisionDate.format',
      });
    });
  });

  describe('field: partnerSupportedByHomeOffice', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerSupportedByHomeOffice', 'required', {}, {
        summary: 'partner-asylum-application:field.partnerSupportedByHomeOffice.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerSupportedByHomeOffice', 'required', { partnerSupportedByHomeOffice: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerSupportedByHomeOffice', 'inArray', { partnerSupportedByHomeOffice: 'bad-value' }, {
        summary: 'partner-asylum-application:field.partnerSupportedByHomeOffice.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerSupportedByHomeOffice', 'inArray', { partnerSupportedByHomeOffice: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerSupportedByHomeOffice', 'inArray', { partnerSupportedByHomeOffice: 'no' });
    });
  });
});
