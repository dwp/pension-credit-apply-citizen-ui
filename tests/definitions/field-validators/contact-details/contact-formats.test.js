const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/contact-details/contact-formats.js');

describe('Validators: contact-formats', () => {
  describe('field: contactFormats', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'contactFormats', 'required', null, {
        summary: 'contact-formats:field.contactFormats.requiredClaimant',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'contactFormats', 'required', { contactFormats: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'contactFormats', 'inArray', { contactFormats: 'bad-value' }, {
        summary: 'contact-formats:field.contactFormats.required',
      });
    });

    it('should pass "inArray" validator if value is audio', async () => {
      await expectValidatorToPass(validators, 'contactFormats', 'inArray', { contactFormats: 'audio' });
    });

    it('should pass "inArray" validator if value is braille', async () => {
      await expectValidatorToPass(validators, 'contactFormats', 'inArray', { contactFormats: 'braille' });
    });

    it('should pass "inArray" validator if value is largePrint', async () => {
      await expectValidatorToPass(validators, 'contactFormats', 'inArray', { contactFormats: 'largePrint' });
    });

    it('should pass "inArray" validator if value is textPhone', async () => {
      await expectValidatorToPass(validators, 'contactFormats', 'inArray', { contactFormats: 'textPhone' });
    });

    it('should pass "inArray" validator if value is typeTalk', async () => {
      await expectValidatorToPass(validators, 'contactFormats', 'inArray', { contactFormats: 'typeTalk' });
    });

    it('should pass "inArray" validator if value is other', async () => {
      await expectValidatorToPass(validators, 'contactFormats', 'inArray', { contactFormats: 'other' });
    });
  });

  describe('field: textPhoneNumber', () => {
    it('should pass "required" validator if no value is provided and contactFormats does not include "textPhone"', async () => {
      await expectValidatorToPass(validators, 'otherDetails', 'required', null);
    });

    it('should fail "required" validator if no value is provided and contactFormats includes "textPhone"', async () => {
      await expectValidatorToFail(validators, 'textPhoneNumber', 'required', { contactFormats: ['audio', 'textPhone'] }, {
        summary: 'contact-formats:field.textPhoneNumber.requiredClaimant',
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
        summary: 'contact-formats:field.textPhoneNumber.lengthClaimant',
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
        summary: 'contact-formats:field.textPhoneNumber.formatClaimant',
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
        summary: 'contact-formats:field.otherDetails.requiredClaimant',
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
        summary: 'contact-formats:field.otherDetails.lengthClaimant',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and contactFormats includes "other"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'otherDetails', 'strlen', { contactFormats: ['audio', 'other'], otherDetails: longString });
    });
  });
});
