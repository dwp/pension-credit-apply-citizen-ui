const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/ground-rent.js');

describe('Validators: ground-rent', () => {
  describe('field: paysGroundRent', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'paysGroundRent', 'required', null, {
        summary: 'ground-rent:field.paysGroundRent.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'paysGroundRent', 'required', { paysGroundRent: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'paysGroundRent', 'inArray', { paysGroundRent: 'bad-value' }, {
        summary: 'ground-rent:field.paysGroundRent.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'paysGroundRent', 'inArray', { paysGroundRent: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'paysGroundRent', 'inArray', { paysGroundRent: 'no' });
    });
  });
});
