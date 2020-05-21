const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/claimant-details.js');

describe('Validators: claimant-details', () => {
  describe('field: fullName', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'fullName', 'required', null, {
        summary: 'claimant-details:field.fullName.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'fullName', 'required', { fullName: 'Jo Bloggs' });
    });

    it('should fail "strlen" validator if string length > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'fullName', 'strlen', { fullName: longString }, {
        summary: 'claimant-details:field.fullName.length',
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
        summary: 'claimant-details:field.hasPreviousNames.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'hasPreviousNames', 'required', { hasPreviousNames: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'hasPreviousNames', 'inArray', { hasPreviousNames: 'bad-value' }, {
        summary: 'claimant-details:field.hasPreviousNames.required',
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
        summary: 'claimant-details:field.previousNames.required',
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
        summary: 'claimant-details:field.previousNames.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and hasPreviousNames is "yes"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'previousNames', 'strlen', { hasPreviousNames: 'yes', previousNames: longString });
    });
  });

  describe('field: nino', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'nino', 'required', null, {
        summary: 'claimant-details:field.nino.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'nino', 'required', { nino: 'a-nino' });
    });

    it('should fail "nino" validator if an invalid nino is provided', async () => {
      await expectValidatorToFail(validators, 'nino', 'nino', { nino: 'invalid-nino' }, {
        summary: 'claimant-details:field.nino.format',
      });
    });

    it('should pass "nino" validator if a valid nino is provided', async () => {
      await expectValidatorToPass(validators, 'nino', 'nino', { nino: 'RN001001A' });
    });
  });

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
