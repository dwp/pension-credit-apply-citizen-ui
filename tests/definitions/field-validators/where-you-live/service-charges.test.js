const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/service-charges.js');

describe('Validators: service-charges', () => {
  describe('field: paysServiceCharges', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'paysServiceCharges', 'required', null, {
        summary: 'service-charges:field.paysServiceCharges.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'paysServiceCharges', 'required', { paysServiceCharges: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'paysServiceCharges', 'inArray', { paysServiceCharges: 'bad-value' }, {
        summary: 'service-charges:field.paysServiceCharges.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'paysServiceCharges', 'inArray', { paysServiceCharges: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'paysServiceCharges', 'inArray', { paysServiceCharges: 'no' });
    });
  });
});
