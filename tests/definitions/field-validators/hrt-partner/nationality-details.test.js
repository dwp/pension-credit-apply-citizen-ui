const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-partner/nationality-details.js');

const longString = 'x'.repeat(501);
const exactString = 'x'.repeat(500);

describe('Validators: partner-nationality-details', () => {
  describe('field: partnerNationality', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerNationality', 'required', null, {
        summary: 'partner-nationality-details:field.partnerNationality.required',
      });
    });

    it('should fail "strlen" validator if value > 500 chars', async () => {
      await expectValidatorToFail(validators, 'partnerNationality', 'strlen', { partnerNationality: longString }, {
        summary: 'partner-nationality-details:field.partnerNationality.strlen',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerNationality', 'required', { partnerNationality: 'test-value' });
    });

    it('should pass "strlen" validator if value < 500 chars is provided', async () => {
      await expectValidatorToPass(validators, 'partnerNationality', 'strlen', { partnerNationality: exactString });
    });
  });

  describe('field: partnerCountry', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerCountry', 'required', null, {
        summary: 'partner-nationality-details:field.partnerCountry.required',
      });
    });

    it('should fail "strlen" validator if value > 500 chars', async () => {
      await expectValidatorToFail(validators, 'partnerCountry', 'strlen', { partnerCountry: longString }, {
        summary: 'partner-nationality-details:field.partnerCountry.strlen',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerCountry', 'required', { partnerCountry: 'test-value' });
    });

    it('should pass "strlen" validator if value < 500 chars is provided', async () => {
      await expectValidatorToPass(validators, 'partnerCountry', 'strlen', { partnerCountry: exactString });
    });
  });

  describe('field: partnerLastCameToUk', () => {
    let _now;

    before(() => {
      _now = Date.now;
    });

    after(() => {
      Date.now = _now;
    });

    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerLastCameToUk', 'required', null, {
        summary: 'partner-nationality-details:field.partnerLastCameToUk.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerLastCameToUk', 'required', { partnerLastCameToUk: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should fail "dateObject" validator if value is not a valid date', async () => {
      await expectValidatorToFail(validators, 'partnerLastCameToUk', 'dateObject', { partnerLastCameToUk: 'invalid-input' }, {
        summary: 'partner-nationality-details:field.partnerLastCameToUk.format',
      });
    });

    it('should fail "dateObject" validator if value is beyond today', async () => {
      Date.now = () => (0); // 1970-01-01
      await expectValidatorToFail(validators, 'partnerLastCameToUk', 'dateObject', { partnerLastCameToUk: { mm: 1, dd: 2, yyyy: 1970 } }, {
        summary: 'partner-nationality-details:field.partnerLastCameToUk.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "dateObject" validator if value is before today', async () => {
      Date.now = () => (86400000); // 1970-01-02
      await expectValidatorToPass(validators, 'partnerLastCameToUk', 'dateObject', { partnerLastCameToUk: { mm: 1, dd: 1, yyyy: 1970 } });
    });
  });

  describe('field: partnerCameToUkToWork', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerCameToUkToWork', 'required', null, {
        summary: 'partner-nationality-details:field.partnerCameToUkToWork.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerCameToUkToWork', 'required', { partnerCameToUkToWork: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerCameToUkToWork', 'inArray', { partnerCameToUkToWork: 'bad-value' }, {
        summary: 'partner-nationality-details:field.partnerCameToUkToWork.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerCameToUkToWork', 'inArray', { partnerCameToUkToWork: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerCameToUkToWork', 'inArray', { partnerCameToUkToWork: 'no' });
    });
  });

  describe('field: partnerNoRecourseToPublicFunds', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerNoRecourseToPublicFunds', 'required', null, {
        summary: 'partner-nationality-details:field.partnerNoRecourseToPublicFunds.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerNoRecourseToPublicFunds', 'required', { partnerNoRecourseToPublicFunds: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerNoRecourseToPublicFunds', 'inArray', { partnerNoRecourseToPublicFunds: 'bad-value' }, {
        summary: 'partner-nationality-details:field.partnerNoRecourseToPublicFunds.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerNoRecourseToPublicFunds', 'inArray', { partnerNoRecourseToPublicFunds: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerNoRecourseToPublicFunds', 'inArray', { partnerNoRecourseToPublicFunds: 'no' });
    });
  });

  describe('field: partnerLivedInUkBefore', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerLivedInUkBefore', 'required', null, {
        summary: 'partner-nationality-details:field.partnerLivedInUkBefore.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerLivedInUkBefore', 'required', { partnerLivedInUkBefore: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerLivedInUkBefore', 'inArray', { partnerLivedInUkBefore: 'bad-value' }, {
        summary: 'partner-nationality-details:field.partnerLivedInUkBefore.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerLivedInUkBefore', 'inArray', { partnerLivedInUkBefore: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerLivedInUkBefore', 'inArray', { partnerLivedInUkBefore: 'no' });
    });
  });

  describe('field: partnerLastLeftUk', () => {
    let _now;

    before(() => {
      _now = Date.now;
    });

    after(() => {
      Date.now = _now;
    });

    it('should pass "required" validator if no value is provided and partnerLivedInUkBefore is no', async () => {
      await expectValidatorToPass(validators, 'partnerLastLeftUk', 'required', { partnerLivedInUkBefore: 'no' });
    });

    it('should fail "required" validator if no value is provided and partnerLivedInUkBefore is yes', async () => {
      await expectValidatorToFail(validators, 'partnerLastLeftUk', 'required', { partnerLivedInUkBefore: 'yes' }, {
        summary: 'partner-nationality-details:field.partnerLastLeftUk.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided and partnerLivedInUkBefore is yes', async () => {
      await expectValidatorToPass(validators, 'partnerLastLeftUk', 'required', { partnerLivedInUkBefore: 'yes', partnerLastLeftUk: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should pass "dateObject" validator if value is not a valid date but partnerLivedInUkBefore is no', async () => {
      await expectValidatorToPass(validators, 'partnerLastLeftUk', 'dateObject', { partnerLivedInUkBefore: 'no', partnerLastLeftUk: 'invalid-input' });
    });

    it('should fail "dateObject" validator if value is not a valid date and partnerLivedInUkBefore is yes', async () => {
      await expectValidatorToFail(validators, 'partnerLastLeftUk', 'dateObject', { partnerLivedInUkBefore: 'yes', partnerLastLeftUk: 'invalid-input' }, {
        summary: 'partner-nationality-details:field.partnerLastLeftUk.format',
      });
    });

    it('should fail "dateObject" validator if value is beyond today', async () => {
      Date.now = () => (0); // 1970-01-01
      await expectValidatorToFail(validators, 'partnerLastLeftUk', 'dateObject', { partnerLivedInUkBefore: 'yes', partnerLastLeftUk: { mm: 1, dd: 2, yyyy: 1970 } }, {
        summary: 'partner-nationality-details:field.partnerLastLeftUk.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "dateObject" validator if value is before today', async () => {
      Date.now = () => (86400000); // 1970-01-02
      await expectValidatorToPass(validators, 'partnerLastLeftUk', 'dateObject', { partnerLivedInUkBefore: 'yes', partnerLastLeftUk: { mm: 1, dd: 1, yyyy: 1970 } });
    });
  });

  describe('field: partnerFamilyReunionScheme', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerFamilyReunionScheme', 'required', null, {
        summary: 'partner-nationality-details:field.partnerFamilyReunionScheme.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerFamilyReunionScheme', 'required', { partnerFamilyReunionScheme: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerFamilyReunionScheme', 'inArray', { partnerFamilyReunionScheme: 'bad-value' }, {
        summary: 'partner-nationality-details:field.partnerFamilyReunionScheme.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerFamilyReunionScheme', 'inArray', { partnerFamilyReunionScheme: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerFamilyReunionScheme', 'inArray', { partnerFamilyReunionScheme: 'no' });
    });
  });
});
