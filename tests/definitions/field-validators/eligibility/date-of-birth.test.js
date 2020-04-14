const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/date-of-birth.js');

describe('Validators: date-of-birth', () => {
  describe('field: dateOfBirth', () => {
    let _now;

    before(() => {
      _now = Date.now;
    });

    after(() => {
      Date.now = _now;
    });

    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'dateOfBirth', 'required', undefined, {
        summary: 'date-of-birth:field.dateOfBirth.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'dateOfBirth', 'required', { dateOfBirth: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should fail "dateObject" validator if value is not a valid date', async () => {
      await expectValidatorToFail(validators, 'dateOfBirth', 'dateObject', { dateOfBirth: 'invalid-input' }, {
        summary: 'date-of-birth:field.dateOfBirth.format',
      });
    });

    it('should fail "dateObject" validator if value is beyond today', async () => {
      Date.now = () => (0); // 1970-01-01
      await expectValidatorToFail(validators, 'dateOfBirth', 'dateObject', { dateOfBirth: { mm: 1, dd: 2, yyyy: 1970 } }, {
        summary: 'date-of-birth:field.dateOfBirth.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "dateObject" validator if value is before today', async () => {
      Date.now = () => (86400000); // 1970-01-02
      await expectValidatorToPass(validators, 'dateOfBirth', 'dateObject', { dateOfBirth: { mm: 1, dd: 1, yyyy: 1970 } });
    });
  });
});
