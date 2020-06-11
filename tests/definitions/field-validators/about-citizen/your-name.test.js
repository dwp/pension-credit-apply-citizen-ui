const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/your-name.js');

describe('Validators: your-name', () => {
  describe('field: fullName', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'fullName', 'required', null, {
        summary: 'your-name:field.fullName.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'fullName', 'required', { fullName: 'Jo Bloggs' });
    });

    it('should fail "strlen" validator if string length > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'fullName', 'strlen', { fullName: longString }, {
        summary: 'your-name:field.fullName.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'fullName', 'strlen', { fullName: longString });
    });
  });

  describe('field: hasPreviousNames', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'hasPreviousNames', 'required', null, {
        summary: 'your-name:field.hasPreviousNames.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'hasPreviousNames', 'required', { hasPreviousNames: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'hasPreviousNames', 'inArray', { hasPreviousNames: 'bad-value' }, {
        summary: 'your-name:field.hasPreviousNames.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'hasPreviousNames', 'inArray', { hasPreviousNames: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'hasPreviousNames', 'inArray', { hasPreviousNames: 'no' });
    });
  });

  describe('field: previousNames', () => {
    it('should pass "required" validator if no value is provided and hasPreviousNames is "no"', async () => {
      await expectValidatorToPass(validators, 'previousNames', 'required', { hasPreviousNames: 'no' });
    });

    it('should fail "required" validator if no value is provided and hasPreviousNames is "yes"', async () => {
      await expectValidatorToFail(validators, 'previousNames', 'required', { hasPreviousNames: 'yes' }, {
        summary: 'your-name:field.previousNames.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and hasPreviousNames is "yes"', async () => {
      await expectValidatorToPass(validators, 'previousNames', 'required', { hasPreviousNames: 'yes', previousNames: 'Hammond Eggs' });
    });

    it('should pass "strlen" validator if string length > 500 and hasPreviousNames is "no"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'previousNames', 'required', { hasPreviousNames: 'no', previousNames: longString });
    });

    it('should fail "strlen" validator if string length > 500 and hasPreviousNames is "yes"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'previousNames', 'strlen', { hasPreviousNames: 'yes', previousNames: longString }, {
        summary: 'your-name:field.previousNames.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and hasPreviousNames is "yes"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'previousNames', 'strlen', { hasPreviousNames: 'yes', previousNames: longString });
    });
  });
});
