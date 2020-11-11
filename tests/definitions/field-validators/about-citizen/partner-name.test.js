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
});
