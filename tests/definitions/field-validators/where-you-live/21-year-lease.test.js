const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/21-year-lease.js');

describe('Validators: 21-year-lease', () => {
  describe('field: twentyOneYearLease', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'twentyOneYearLease', 'required', null, {
        summary: '21-year-lease:field.twentyOneYearLease.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'twentyOneYearLease', 'required', { twentyOneYearLease: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'twentyOneYearLease', 'inArray', { twentyOneYearLease: 'bad-value' }, {
        summary: '21-year-lease:field.twentyOneYearLease.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'twentyOneYearLease', 'inArray', { twentyOneYearLease: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'twentyOneYearLease', 'inArray', { twentyOneYearLease: 'no' });
    });
  });
});
