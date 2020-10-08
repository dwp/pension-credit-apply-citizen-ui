const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/different-claim-date.js');

describe('Validators: different-claim-date', () => {
  describe('field: differentClaimDate', () => {
    let _now;

    before(() => {
      _now = Date.now;
    });

    after(() => {
      Date.now = _now;
    });

    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'differentClaimDate', 'required', undefined, {
        summary: 'different-claim-date:field.differentClaimDate.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'differentClaimDate', 'required', { differentClaimDate: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should fail "dateObject" validator if value is not a valid date', async () => {
      await expectValidatorToFail(validators, 'differentClaimDate', 'dateObject', { differentClaimDate: 'invalid-input' }, {
        summary: 'different-claim-date:field.differentClaimDate.format',
      });
    });

    it('should fail "dateObject" validator if value is beyond today', async () => {
      Date.now = () => (0); // 1970-01-01
      await expectValidatorToFail(validators, 'differentClaimDate', 'dateObject', { differentClaimDate: { mm: 1, dd: 2, yyyy: 1970 } }, {
        summary: 'different-claim-date:field.differentClaimDate.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "dateObject" validator if value is before today', async () => {
      Date.now = () => (86400000); // 1970-01-02
      await expectValidatorToPass(validators, 'differentClaimDate', 'dateObject', { differentClaimDate: { mm: 1, dd: 1, yyyy: 1970 } });
    });
  });
});
