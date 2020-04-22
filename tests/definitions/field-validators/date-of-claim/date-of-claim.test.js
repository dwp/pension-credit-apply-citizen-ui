const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/date-of-claim/date-of-claim.js');

describe('Validators: date-of-claim', () => {
  describe('field: dateOfClaim', () => {
    let _now;

    before(() => {
      _now = Date.now;
    });

    after(() => {
      Date.now = _now;
    });

    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'dateOfClaim', 'required', undefined, {
        summary: 'date-of-claim:field.dateOfClaim.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'dateOfClaim', 'required', { dateOfClaim: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should fail "dateObject" validator if value is not a valid date', async () => {
      await expectValidatorToFail(validators, 'dateOfClaim', 'dateObject', { dateOfClaim: 'invalid-input' }, {
        summary: 'date-of-claim:field.dateOfClaim.format',
      });
    });

    it('should pass "dateObject" validator if value is a valid date', async () => {
      await expectValidatorToPass(validators, 'dateOfClaim', 'dateObject', { dateOfClaim: { dd: '01', mm: '02', yyyy: '2000' } });
    });
  });
});
