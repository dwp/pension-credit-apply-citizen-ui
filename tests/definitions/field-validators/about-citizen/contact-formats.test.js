const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/contact-formats.js');

describe('Validators: contact-formats', () => {
  describe('field: textPhoneNumber', () => {
    it('should pass "required" validator if no value is provided and contactFormats does not include "textPhone"', async () => {
      await expectValidatorToPass(validators, 'otherDetails', 'required', null);
    });

    it('should fail "required" validator if no value is provided and contactFormats includes "textPhone"', async () => {
      await expectValidatorToFail(validators, 'textPhoneNumber', 'required', { contactFormats: ['audio', 'textPhone'] }, {
        summary: 'contact-formats:field.textPhoneNumber.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and contactFormats includes "textPhone"', async () => {
      await expectValidatorToPass(validators, 'textPhoneNumber', 'required', { contactFormats: ['audio', 'textPhone'], textPhoneNumber: 'a-value' });
    });

    it('should pass "strlen" validator if string length > 20 and contactFormats does not include "textPhone"', async () => {
      const longString = Array(22).join('x');
      await expectValidatorToPass(validators, 'textPhoneNumber', 'strlen', { contactFormats: ['audio'], textPhoneNumber: longString });
    });

    it('should fail "strlen" validator if string length > 20 and contactFormats includes "textPhone"', async () => {
      const longString = Array(22).join('x');
      await expectValidatorToFail(validators, 'textPhoneNumber', 'strlen', { contactFormats: ['audio', 'textPhone'], textPhoneNumber: longString }, {
        summary: 'contact-formats:field.textPhoneNumber.length',
      });
    });

    it('should pass "strlen" validator if string length <= 20 and contactFormats includes "textPhone"', async () => {
      const longString = Array(2).join('x');
      await expectValidatorToPass(validators, 'textPhoneNumber', 'strlen', { contactFormats: ['audio', 'textPhone'], textPhoneNumber: longString });
    });

    it('should pass "isValidTelephoneNumber" validator if value contains characters other than 0-9, spaces and - and contactFormats does not include "textPhone"', async () => {
      await expectValidatorToPass(validators, 'textPhoneNumber', 'isValidTelephoneNumber', { contactFormats: ['audio'], textPhoneNumber: '!1234567 A 68' });
    });

    it('should fail "isValidTelephoneNumber" validator if value contains characters other than 0-9, spaces and - and contactFormats includes "textPhone"', async () => {
      await expectValidatorToFail(validators, 'textPhoneNumber', 'isValidTelephoneNumber', { contactFormats: ['audio', 'textPhone'], textPhoneNumber: '!1234567 A 68' }, {
        summary: 'contact-formats:field.textPhoneNumber.format',
      });
    });

    it('should pass "isValidTelephoneNumber" validator if value contains only the characters 0-9, spaces, and - and contactFormats includes "textPhone"', async () => {
      await expectValidatorToPass(validators, 'textPhoneNumber', 'isValidTelephoneNumber', { contactFormats: ['audio', 'textPhone'], textPhoneNumber: '(1289) 100 - 100' });
    });
  });

  describe('field: otherDetails', () => {
    it('should pass "required" validator if no value is provided and contactFormats does not include "other"', async () => {
      await expectValidatorToPass(validators, 'otherDetails', 'required', { contactFormats: ['audio'] });
    });

    it('should fail "required" validator if no value is provided and contactFormats includes "other"', async () => {
      await expectValidatorToFail(validators, 'otherDetails', 'required', { contactFormats: ['audio', 'other'] }, {
        summary: 'contact-formats:field.otherDetails.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and contactFormats includes "other"', async () => {
      await expectValidatorToPass(validators, 'otherDetails', 'required', { contactFormats: ['audio', 'other'], otherDetails: 'Detail' });
    });

    it('should pass "strlen" validator if string length > 500 and contactFormats does not include "other"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'otherDetails', 'required', { contactFormats: ['audio'], otherDetails: longString });
    });

    it('should fail "strlen" validator if string length > 500 and contactFormats includes "other"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'otherDetails', 'strlen', { contactFormats: ['audio', 'other'], otherDetails: longString }, {
        summary: 'contact-formats:field.otherDetails.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and contactFormats includes "other"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'otherDetails', 'strlen', { contactFormats: ['audio', 'other'], otherDetails: longString });
    });
  });
});
