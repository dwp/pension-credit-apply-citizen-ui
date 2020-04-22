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

  describe('field: canSpeakEnglish', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'canSpeakEnglish', 'required', null, {
        summary: 'claimant-details:field.canSpeakEnglish.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'canSpeakEnglish', 'required', { canSpeakEnglish: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'canSpeakEnglish', 'inArray', { canSpeakEnglish: 'bad-value' }, {
        summary: 'claimant-details:field.canSpeakEnglish.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'canSpeakEnglish', 'inArray', { canSpeakEnglish: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'canSpeakEnglish', 'inArray', { canSpeakEnglish: 'no' });
    });
  });

  describe('field: firstLanguage', () => {
    it('should pass "required" validator if no value is provided and canSpeakEnglish is "yes"', async () => {
      await expectValidatorToPass(validators, 'firstLanguage', 'required', { canSpeakEnglish: 'yes' });
    });

    it('should fail "required" validator if no value is provided and canSpeakEnglish is "no"', async () => {
      await expectValidatorToFail(validators, 'firstLanguage', 'required', { canSpeakEnglish: 'no' }, {
        summary: 'claimant-details:field.firstLanguage.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and canSpeakEnglish is "no"', async () => {
      await expectValidatorToPass(validators, 'firstLanguage', 'required', { canSpeakEnglish: 'no', firstLanguage: 'Welsh' });
    });

    it('should pass "strlen" validator if string length > 500 and canSpeakEnglish is "yes"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'firstLanguage', 'required', { canSpeakEnglish: 'yes', firstLanguage: longString });
    });

    it('should fail "strlen" validator if string length > 500 and canSpeakEnglish is "no"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'firstLanguage', 'strlen', { canSpeakEnglish: 'no', firstLanguage: longString }, {
        summary: 'claimant-details:field.firstLanguage.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and canSpeakEnglish is "no"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'firstLanguage', 'strlen', { canSpeakEnglish: 'no', firstLanguage: longString });
    });
  });

  describe('field: speakInWelsh', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'speakInWelsh', 'required', null, {
        summary: 'claimant-details:field.speakInWelsh.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'speakInWelsh', 'required', { speakInWelsh: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'speakInWelsh', 'inArray', { speakInWelsh: 'bad-value' }, {
        summary: 'claimant-details:field.speakInWelsh.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'speakInWelsh', 'inArray', { speakInWelsh: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'speakInWelsh', 'inArray', { speakInWelsh: 'no' });
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
