const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-citizen/asylum-application.js');

describe('Validators: asylum-application', () => {
  describe('field: asylumBefore3April2000', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'asylumBefore3April2000', 'required', {}, {
        summary: 'asylum-application:field.asylumBefore3April2000.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'asylumBefore3April2000', 'required', { asylumBefore3April2000: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'asylumBefore3April2000', 'inArray', { asylumBefore3April2000: 'bad-value' }, {
        summary: 'asylum-application:field.asylumBefore3April2000.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'asylumBefore3April2000', 'inArray', { asylumBefore3April2000: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'asylumBefore3April2000', 'inArray', { asylumBefore3April2000: 'no' });
    });
  });

  describe('field: successfulDecision', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'successfulDecision', 'required', {}, {
        summary: 'asylum-application:field.successfulDecision.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'successfulDecision', 'required', { successfulDecision: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'successfulDecision', 'inArray', { successfulDecision: 'bad-value' }, {
        summary: 'asylum-application:field.successfulDecision.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'successfulDecision', 'inArray', { successfulDecision: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'successfulDecision', 'inArray', { successfulDecision: 'no' });
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
        summary: 'asylum-application:field.successfulDecisionDate.required',
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
        summary: 'asylum-application:field.successfulDecisionDate.format',
      });
    });
  });

  describe('field: supportedByHomeOffice', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'supportedByHomeOffice', 'required', {}, {
        summary: 'asylum-application:field.supportedByHomeOffice.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'supportedByHomeOffice', 'required', { supportedByHomeOffice: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'supportedByHomeOffice', 'inArray', { supportedByHomeOffice: 'bad-value' }, {
        summary: 'asylum-application:field.supportedByHomeOffice.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'supportedByHomeOffice', 'inArray', { supportedByHomeOffice: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'supportedByHomeOffice', 'inArray', { supportedByHomeOffice: 'no' });
    });
  });
});
