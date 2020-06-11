const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/partner-name.js');

describe('Validators: partner-name', () => {
  describe('field: partnerFullName', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerFullName', 'required', null, {
        summary: 'partner-name:field.partnerFullName.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerFullName', 'required', { partnerFullName: 'Jo Bloggs' });
    });

    it('should fail "strlen" validator if string length > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'partnerFullName', 'strlen', { partnerFullName: longString }, {
        summary: 'partner-name:field.partnerFullName.length',
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
        summary: 'partner-name:field.partnerHasPreviousNames.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerHasPreviousNames', 'required', { partnerHasPreviousNames: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerHasPreviousNames', 'inArray', { partnerHasPreviousNames: 'bad-value' }, {
        summary: 'partner-name:field.partnerHasPreviousNames.required',
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
        summary: 'partner-name:field.partnerPreviousNames.required',
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
        summary: 'partner-name:field.partnerPreviousNames.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and partnerHasPreviousNames is "yes"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'partnerPreviousNames', 'strlen', { partnerHasPreviousNames: 'yes', partnerPreviousNames: longString });
    });
  });
});
