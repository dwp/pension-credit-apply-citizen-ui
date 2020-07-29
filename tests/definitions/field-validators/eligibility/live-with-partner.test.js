const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/live-with-partner.js');

describe('Validators: live-with-partner', () => {
  describe('field: havePartner', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'havePartner', 'required', null, {
        summary: 'live-with-partner:field.havePartner.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'havePartner', 'required', { havePartner: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'havePartner', 'inArray', { havePartner: 'bad-value' }, {
        summary: 'live-with-partner:field.havePartner.required',
      });
    });

    it('should pass "inArray" validator if value is yesLiveTogether', async () => {
      await expectValidatorToPass(validators, 'havePartner', 'inArray', { havePartner: 'yesLiveTogether' });
    });

    it('should pass "inArray" validator if value is yesLiveApart', async () => {
      await expectValidatorToPass(validators, 'havePartner', 'inArray', { havePartner: 'yesLiveApart' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'havePartner', 'inArray', { havePartner: 'no' });
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

    it('should pass "required" validator if no value is provided and havePartner is no', async () => {
      await expectValidatorToPass(validators, 'partnerDateOfBirth', 'required', { havePartner: 'no' });
    });

    it('should pass "required" validator if no value is provided and havePartner is yesLiveApart', async () => {
      await expectValidatorToPass(validators, 'partnerDateOfBirth', 'required', { havePartner: 'yesLiveApart' });
    });

    it('should fail "required" validator if no value is provided and havePartner is yesLiveTogether', async () => {
      await expectValidatorToFail(validators, 'partnerDateOfBirth', 'required', { havePartner: 'yesLiveTogether' }, {
        summary: 'live-with-partner:field.partnerDateOfBirth.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided and havePartner is yesLiveTogether', async () => {
      await expectValidatorToPass(validators, 'partnerDateOfBirth', 'required', { havePartner: 'yesLiveTogether', partnerDateOfBirth: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should pass "dateObject" validator if value is not a valid date but havePartner is no', async () => {
      await expectValidatorToPass(validators, 'partnerDateOfBirth', 'dateObject', { havePartner: 'no', partnerDateOfBirth: 'invalid-input' });
    });

    it('should fail "dateObject" validator if value is not a valid date and havePartner is yesLiveTogether', async () => {
      await expectValidatorToFail(validators, 'partnerDateOfBirth', 'dateObject', { havePartner: 'yesLiveTogether', partnerDateOfBirth: 'invalid-input' }, {
        summary: 'live-with-partner:field.partnerDateOfBirth.format',
      });
    });

    it('should fail "dateObject" validator if value is beyond today and havePartner is yesLiveTogether', async () => {
      Date.now = () => (0); // 1970-01-01
      await expectValidatorToFail(validators, 'partnerDateOfBirth', 'dateObject', { havePartner: 'yesLiveTogether', partnerDateOfBirth: { mm: 1, dd: 2, yyyy: 1970 } }, {
        summary: 'live-with-partner:field.partnerDateOfBirth.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "dateObject" validator if value is before today and havePartner is yesLiveTogether', async () => {
      Date.now = () => (86400000); // 1970-01-02
      await expectValidatorToPass(validators, 'partnerDateOfBirth', 'dateObject', { havePartner: 'yesLiveTogether', partnerDateOfBirth: { mm: 1, dd: 1, yyyy: 1970 } });
    });
  });
});
