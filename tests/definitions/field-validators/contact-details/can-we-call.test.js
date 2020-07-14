const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/contact-details/can-we-call.js');

describe('Validators: can-we-call', () => {
  describe('field: canWeCall', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'canWeCall', 'required', null, {
        summary: 'can-we-call:field.canWeCall.requiredClaimant',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'canWeCall', 'required', { canWeCall: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'canWeCall', 'inArray', { canWeCall: 'bad-value' }, {
        summary: 'can-we-call:field.canWeCall.requiredClaimant',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'canWeCall', 'inArray', { canWeCall: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'canWeCall', 'inArray', { canWeCall: 'no' });
    });
  });

  describe('field: contactTelephone', () => {
    it('should pass "required" validator if no value is provided and canWeCall is "no"', async () => {
      await expectValidatorToPass(validators, 'contactTelephone', 'required', { canWeCall: 'no' });
    });

    it('should fail "required" validator if no value is provided and canWeCall is "yes"', async () => {
      await expectValidatorToFail(validators, 'contactTelephone', 'required', { canWeCall: 'yes' }, {
        summary: 'can-we-call:field.contactTelephone.requiredClaimant',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and canWeCall is "yes"', async () => {
      await expectValidatorToPass(validators, 'contactTelephone', 'required', { canWeCall: 'yes', contactTelephone: 'Job 1' });
    });

    it('should pass "strlen" validator if string length > 20 and canWeCall is "no"', async () => {
      const longString = Array(22).join('x');
      await expectValidatorToPass(validators, 'contactTelephone', 'required', { canWeCall: 'no', contactTelephone: longString });
    });

    it('should fail "strlen" validator if string length > 20 and canWeCall is "yes"', async () => {
      const longString = Array(22).join('x');
      await expectValidatorToFail(validators, 'contactTelephone', 'strlen', { canWeCall: 'yes', contactTelephone: longString }, {
        summary: 'can-we-call:field.contactTelephone.lengthClaimant',
      });
    });

    it('should pass "strlen" validator if string length <= 20 and canWeCall is "yes"', async () => {
      const longString = Array(21).join('x');
      await expectValidatorToPass(validators, 'contactTelephone', 'strlen', { canWeCall: 'yes', contactTelephone: longString });
    });

    it('should pass "isValidTelephoneNumber" validator if invalid value is provided and canWeCall is "no"', async () => {
      await expectValidatorToPass(validators, 'contactTelephone', 'isValidTelephoneNumber', { canWeCall: 'no', contactTelephone: 'bad-number' });
    });

    it('should fail "isValidTelephoneNumber" validator if invalid value is provided and canWeCall is "yes"', async () => {
      await expectValidatorToFail(validators, 'contactTelephone', 'isValidTelephoneNumber', { canWeCall: 'yes', contactTelephone: 'bad-number' }, {
        summary: 'can-we-call:field.contactTelephone.formatClaimant',
      });
    });

    it('should pass "isValidTelephoneNumber" validator if valid value is provided and canWeCall is "yes"', async () => {
      await expectValidatorToPass(validators, 'contactTelephone', 'isValidTelephoneNumber', { canWeCall: 'yes', contactTelephone: '01234567890' });
    });
  });
});
