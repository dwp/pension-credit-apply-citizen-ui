const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/claimant-language.js');

describe('Validators: claimant-language', () => {
  describe('field: preferredLanguage', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'preferredLanguage', 'required', null, {
        summary: 'claimant-language:field.preferredLanguage.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'preferredLanguage', 'required', { preferredLanguage: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'preferredLanguage', 'inArray', { preferredLanguage: 'bad-value' }, {
        summary: 'claimant-language:field.preferredLanguage.required',
      });
    });

    it('should pass "inArray" validator if value is english', async () => {
      await expectValidatorToPass(validators, 'preferredLanguage', 'inArray', { preferredLanguage: 'english' });
    });

    it('should pass "inArray" validator if value is welsh', async () => {
      await expectValidatorToPass(validators, 'preferredLanguage', 'inArray', { preferredLanguage: 'welsh' });
    });

    it('should pass "inArray" validator if value is other', async () => {
      await expectValidatorToPass(validators, 'preferredLanguage', 'inArray', { preferredLanguage: 'other' });
    });
  });

  describe('field: preferredLanguageOther', () => {
    it('should pass "required" validator if no value is provided and preferredLanguage is "english"', async () => {
      await expectValidatorToPass(validators, 'preferredLanguageOther', 'required', { preferredLanguage: 'english' });
    });

    it('should pass "required" validator if no value is provided and preferredLanguage is "welsh"', async () => {
      await expectValidatorToPass(validators, 'preferredLanguageOther', 'required', { preferredLanguage: 'english' });
    });

    it('should fail "required" validator if no value is provided and preferredLanguage is "other"', async () => {
      await expectValidatorToFail(validators, 'preferredLanguageOther', 'required', { preferredLanguage: 'other' }, {
        summary: 'claimant-language:field.preferredLanguageOther.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and preferredLanguage is "other"', async () => {
      await expectValidatorToPass(validators, 'preferredLanguageOther', 'required', { preferredLanguage: 'other', preferredLanguageOther: 'Finnish' });
    });

    it('should pass "strlen" validator if string length > 500 and preferredLanguage is "english"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'preferredLanguageOther', 'required', { preferredLanguage: 'english', preferredLanguageOther: longString });
    });

    it('should fail "strlen" validator if string length > 500 and preferredLanguage is "other"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'preferredLanguageOther', 'strlen', { preferredLanguage: 'other', preferredLanguageOther: longString }, {
        summary: 'claimant-language:field.preferredLanguageOther.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and preferredLanguage is "other"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'preferredLanguageOther', 'strlen', { preferredLanguage: 'other', preferredLanguageOther: longString });
    });
  });
});
