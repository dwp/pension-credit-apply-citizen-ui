const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/share-rent-mortgage.js');

describe('Validators: share-rent-mortgage', () => {
  describe('field: shareRentMortgage', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'shareRentMortgage', 'required', null, {
        summary: 'share-rent-mortgage:field.shareRentMortgage.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'shareRentMortgage', 'required', { shareRentMortgage: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'shareRentMortgage', 'inArray', { shareRentMortgage: 'bad-value' }, {
        summary: 'share-rent-mortgage:field.shareRentMortgage.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'shareRentMortgage', 'inArray', { shareRentMortgage: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'shareRentMortgage', 'inArray', { shareRentMortgage: 'no' });
    });
  });
});
