const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/income/universal-credit.js');

describe('Validators: universal-credit', () => {
  describe('field: claimsUniversalCredit', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'claimsUniversalCredit', 'required', null, {
        summary: 'universal-credit:field.claimsUniversalCredit.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'claimsUniversalCredit', 'required', { claimsUniversalCredit: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'claimsUniversalCredit', 'inArray', { claimsUniversalCredit: 'bad-value' }, {
        summary: 'universal-credit:field.claimsUniversalCredit.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'claimsUniversalCredit', 'inArray', { claimsUniversalCredit: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'claimsUniversalCredit', 'inArray', { claimsUniversalCredit: 'no' });
    });
  });
});
