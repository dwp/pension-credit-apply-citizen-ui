const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/claimant-details.js');

describe('Validators: claimant-details', () => {
  describe('field: contactTelephone', () => {
    it('should fail "strlen" validator if string length > 20', async () => {
      const longString = Array(22).join('x');
      await expectValidatorToFail(validators, 'contactTelephone', 'strlen', { contactTelephone: longString }, {
        summary: 'claimant-details:field.contactTelephone.length',
      });
    });

    it('should pass "strlen" validator if string length <= 20', async () => {
      const longString = Array(2).join('x');
      await expectValidatorToPass(validators, 'contactTelephone', 'strlen', { contactTelephone: longString });
    });

    it('should fail "isValidTelephoneNumber" validator if value contains characters other than 0-9, spaces and -', async () => {
      await expectValidatorToFail(validators, 'contactTelephone', 'isValidTelephoneNumber', { contactTelephone: '!1234567 A 68' }, {
        summary: 'claimant-details:field.contactTelephone.format',
      });
    });

    it('should pass "isValidTelephoneNumber" validator if value contains only the characters 0-9, spaces, and -', async () => {
      await expectValidatorToPass(validators, 'contactTelephone', 'isValidTelephoneNumber', { contactTelephone: '(1289) 100 - 100' });
    });
  });

  describe('field: registeredBlind', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'registeredBlind', 'required', null, {
        summary: 'claimant-details:field.registeredBlind.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'registeredBlind', 'required', { registeredBlind: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'registeredBlind', 'inArray', { registeredBlind: 'bad-value' }, {
        summary: 'claimant-details:field.registeredBlind.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'registeredBlind', 'inArray', { registeredBlind: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'registeredBlind', 'inArray', { registeredBlind: 'no' });
    });
  });

  describe('field: preferredLanguage', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'preferredLanguage', 'required', null, {
        summary: 'claimant-details:field.preferredLanguage.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'preferredLanguage', 'required', { preferredLanguage: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'preferredLanguage', 'inArray', { preferredLanguage: 'bad-value' }, {
        summary: 'claimant-details:field.preferredLanguage.required',
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
        summary: 'claimant-details:field.preferredLanguageOther.required',
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
        summary: 'claimant-details:field.preferredLanguageOther.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and preferredLanguage is "other"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'preferredLanguageOther', 'strlen', { preferredLanguage: 'other', preferredLanguageOther: longString });
    });
  });

  describe('field: helpWithLettersPhone', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'helpWithLettersPhone', 'required', null, {
        summary: 'claimant-details:field.helpWithLettersPhone.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'helpWithLettersPhone', 'required', { helpWithLettersPhone: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'helpWithLettersPhone', 'inArray', { helpWithLettersPhone: 'bad-value' }, {
        summary: 'claimant-details:field.helpWithLettersPhone.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'helpWithLettersPhone', 'inArray', { helpWithLettersPhone: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'helpWithLettersPhone', 'inArray', { helpWithLettersPhone: 'no' });
    });
  });
});
