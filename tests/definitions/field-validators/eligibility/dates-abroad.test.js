const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/dates-abroad.js');

describe('Validators: dates-abroad', () => {
  describe('field: dateYouLeft', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'dateYouLeft', 'required', undefined, {
        summary: 'dates-abroad:field.dateYouLeft.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'dateYouLeft', 'required', { dateYouLeft: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should fail "dateObject" validator if value is not a valid date', async () => {
      await expectValidatorToFail(validators, 'dateYouLeft', 'dateObject', { dateYouLeft: 'invalid-input' }, {
        summary: 'dates-abroad:field.dateYouLeft.format',
      });
    });
  });

  describe('field: dateYouReturned', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'dateYouReturned', 'required', undefined, {
        summary: 'dates-abroad:field.dateYouReturned.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'dateYouReturned', 'required', { dateYouReturned: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should fail "dateObject" validator if value is not a valid date', async () => {
      await expectValidatorToFail(validators, 'dateYouReturned', 'dateObject', { dateYouReturned: 'invalid-input' }, {
        summary: 'dates-abroad:field.dateYouReturned.format',
      });
    });
  });
});
