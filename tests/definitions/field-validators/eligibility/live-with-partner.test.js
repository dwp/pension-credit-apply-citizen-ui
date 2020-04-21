const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/live-with-partner.js');

describe('Validators: live-with-partner', () => {
  describe('field: liveWithPartner', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'liveWithPartner', 'required', null, {
        summary: 'live-with-partner:field.liveWithPartner.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'liveWithPartner', 'required', { liveWithPartner: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'liveWithPartner', 'inArray', { liveWithPartner: 'bad-value' }, {
        summary: 'live-with-partner:field.liveWithPartner.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'liveWithPartner', 'inArray', { liveWithPartner: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'liveWithPartner', 'inArray', { liveWithPartner: 'no' });
    });
  });

  describe('field: partnerDateOfBirth', () => {
    let _now;

    before(() => {
      _now = Date.now;
    });

    after(() => {
      Date.now = _now;
    });

    it('should pass "required" validator if no value is provided and liveWithPartner is no', async () => {
      await expectValidatorToPass(validators, 'partnerDateOfBirth', 'required', { liveWithPartner: 'no' });
    });

    it('should fail "required" validator if no value is provided and liveWithPartner is yes', async () => {
      await expectValidatorToFail(validators, 'partnerDateOfBirth', 'required', { liveWithPartner: 'yes' }, {
        summary: 'live-with-partner:field.partnerDateOfBirth.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided and liveWithPartner is yes', async () => {
      await expectValidatorToPass(validators, 'partnerDateOfBirth', 'required', { liveWithPartner: 'yes', partnerDateOfBirth: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should pass "dateObject" validator if value is not a valid date but liveWithPartner is no', async () => {
      await expectValidatorToPass(validators, 'partnerDateOfBirth', 'dateObject', { liveWithPartner: 'no', partnerDateOfBirth: 'invalid-input' });
    });

    it('should fail "dateObject" validator if value is not a valid date and liveWithPartner is yes', async () => {
      await expectValidatorToFail(validators, 'partnerDateOfBirth', 'dateObject', { liveWithPartner: 'yes', partnerDateOfBirth: 'invalid-input' }, {
        summary: 'live-with-partner:field.partnerDateOfBirth.format',
      });
    });

    it('should fail "dateObject" validator if value is beyond today and liveWithPartner is yes', async () => {
      Date.now = () => (0); // 1970-01-01
      await expectValidatorToFail(validators, 'partnerDateOfBirth', 'dateObject', { liveWithPartner: 'yes', partnerDateOfBirth: { mm: 1, dd: 2, yyyy: 1970 } }, {
        summary: 'live-with-partner:field.partnerDateOfBirth.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "dateObject" validator if value is before today and liveWithPartner is yes', async () => {
      Date.now = () => (86400000); // 1970-01-02
      await expectValidatorToPass(validators, 'partnerDateOfBirth', 'dateObject', { liveWithPartner: 'yes', partnerDateOfBirth: { mm: 1, dd: 1, yyyy: 1970 } });
    });
  });
});
