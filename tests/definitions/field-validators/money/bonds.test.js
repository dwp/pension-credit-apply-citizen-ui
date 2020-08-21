const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/money/bonds.js');

describe('Validators: bonds', () => {
  describe('field: hasIncomeOrCapitalBonds', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'hasIncomeOrCapitalBonds', 'required', null, {
        summary: 'bonds:field.hasIncomeOrCapitalBonds.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'hasIncomeOrCapitalBonds', 'required', { hasIncomeOrCapitalBonds: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'hasIncomeOrCapitalBonds', 'inArray', { hasIncomeOrCapitalBonds: 'bad-value' }, {
        summary: 'bonds:field.hasIncomeOrCapitalBonds.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'hasIncomeOrCapitalBonds', 'inArray', { hasIncomeOrCapitalBonds: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'hasIncomeOrCapitalBonds', 'inArray', { hasIncomeOrCapitalBonds: 'no' });
    });
  });
});
