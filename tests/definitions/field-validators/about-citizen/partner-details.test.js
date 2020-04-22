const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/partner-details.js');

describe('Validators: partner-details', () => {
  describe('field: partnerFullName', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerFullName', 'required', null, {
        summary: 'partner-details:field.partnerFullName.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerFullName', 'required', { partnerFullName: 'Jo Bloggs' });
    });

    it('should fail "strlen" validator if string length > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'partnerFullName', 'strlen', { partnerFullName: longString }, {
        summary: 'partner-details:field.partnerFullName.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'partnerFullName', 'strlen', { partnerFullName: longString });
    });
  });

  describe('field: partnerHasPreviousNames', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerHasPreviousNames', 'required', null, {
        summary: 'partner-details:field.partnerHasPreviousNames.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerHasPreviousNames', 'required', { partnerHasPreviousNames: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerHasPreviousNames', 'inArray', { partnerHasPreviousNames: 'bad-value' }, {
        summary: 'partner-details:field.partnerHasPreviousNames.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerHasPreviousNames', 'inArray', { partnerHasPreviousNames: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerHasPreviousNames', 'inArray', { partnerHasPreviousNames: 'no' });
    });
  });

  describe('field: partnerPreviousNames', () => {
    it('should pass "required" validator if no value is provided and partnerHasPreviousNames is "no"', async () => {
      await expectValidatorToPass(validators, 'partnerPreviousNames', 'required', { partnerHasPreviousNames: 'no' });
    });

    it('should fail "required" validator if no value is provided and partnerHasPreviousNames is "yes"', async () => {
      await expectValidatorToFail(validators, 'partnerPreviousNames', 'required', { partnerHasPreviousNames: 'yes' }, {
        summary: 'partner-details:field.partnerPreviousNames.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and partnerHasPreviousNames is "yes"', async () => {
      await expectValidatorToPass(validators, 'partnerPreviousNames', 'required', { partnerHasPreviousNames: 'yes', partnerPreviousNames: 'Hammond Eggs' });
    });

    it('should pass "strlen" validator if string length > 500 and partnerHasPreviousNames is "no"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'partnerPreviousNames', 'required', { partnerHasPreviousNames: 'no', partnerPreviousNames: longString });
    });

    it('should fail "strlen" validator if string length > 500 and partnerHasPreviousNames is "yes"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'partnerPreviousNames', 'strlen', { partnerHasPreviousNames: 'yes', partnerPreviousNames: longString }, {
        summary: 'partner-details:field.partnerPreviousNames.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and partnerHasPreviousNames is "yes"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'partnerPreviousNames', 'strlen', { partnerHasPreviousNames: 'yes', partnerPreviousNames: longString });
    });
  });

  describe('field: partnerNino', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerNino', 'required', null, {
        summary: 'partner-details:field.partnerNino.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerNino', 'required', { partnerNino: 'a-nino' });
    });

    it('should fail "nino" validator if an invalid nino is provided', async () => {
      await expectValidatorToFail(validators, 'partnerNino', 'nino', { partnerNino: 'invalid-nino' }, {
        summary: 'partner-details:field.partnerNino.format',
      });
    });

    it('should pass "nino" validator if a valid nino is provided', async () => {
      await expectValidatorToPass(validators, 'partnerNino', 'nino', { partnerNino: 'RN001001A' });
    });
  });

  describe('field: partnerRegisteredBlind', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerRegisteredBlind', 'required', null, {
        summary: 'partner-details:field.partnerRegisteredBlind.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerRegisteredBlind', 'required', { partnerRegisteredBlind: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerRegisteredBlind', 'inArray', { partnerRegisteredBlind: 'bad-value' }, {
        summary: 'partner-details:field.partnerRegisteredBlind.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerRegisteredBlind', 'inArray', { partnerRegisteredBlind: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerRegisteredBlind', 'inArray', { partnerRegisteredBlind: 'no' });
    });
  });
});
