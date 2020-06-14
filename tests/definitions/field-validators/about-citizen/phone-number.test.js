const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/about-claimant/phone-number.js');

describe('Validators: phone-number', () => {
  describe('field: contactTelephone', () => {
    it('should fail "strlen" validator if string length > 20', async () => {
      const longString = Array(22).join('x');
      await expectValidatorToFail(validators, 'contactTelephone', 'strlen', { contactTelephone: longString }, {
        summary: 'phone-number:field.contactTelephone.length',
      });
    });

    it('should pass "strlen" validator if string length <= 20', async () => {
      const longString = Array(2).join('x');
      await expectValidatorToPass(validators, 'contactTelephone', 'strlen', { contactTelephone: longString });
    });

    it('should fail "isValidTelephoneNumber" validator if value contains characters other than 0-9, spaces and -', async () => {
      await expectValidatorToFail(validators, 'contactTelephone', 'isValidTelephoneNumber', { contactTelephone: '!1234567 A 68' }, {
        summary: 'phone-number:field.contactTelephone.format',
      });
    });

    it('should pass "isValidTelephoneNumber" validator if value contains only the characters 0-9, spaces, and -', async () => {
      await expectValidatorToPass(validators, 'contactTelephone', 'isValidTelephoneNumber', { contactTelephone: '(1289) 100 - 100' });
    });
  });
});
