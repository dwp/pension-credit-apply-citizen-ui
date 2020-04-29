const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/hrt-citizen/nationality-details.js');

const longString = 'x'.repeat(501);
const exactString = 'x'.repeat(500);

describe('Validators: nationality-details', () => {
  describe('field: nationality', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'nationality', 'required', null, {
        summary: 'nationality-details:field.nationality.required',
      });
    });

    it('should fail "strlen" validator if value > 500 chars', async () => {
      await expectValidatorToFail(validators, 'nationality', 'strlen', { nationality: longString }, {
        summary: 'nationality-details:field.nationality.strlen',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'nationality', 'required', { nationality: 'test-value' });
    });

    it('should pass "strlen" validator if value < 500 chars is provided', async () => {
      await expectValidatorToPass(validators, 'nationality', 'strlen', { nationality: exactString });
    });
  });

  describe('field: country', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'country', 'required', null, {
        summary: 'nationality-details:field.country.required',
      });
    });

    it('should fail "strlen" validator if value > 500 chars', async () => {
      await expectValidatorToFail(validators, 'country', 'strlen', { country: longString }, {
        summary: 'nationality-details:field.country.strlen',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'country', 'required', { country: 'test-value' });
    });

    it('should pass "strlen" validator if value < 500 chars is provided', async () => {
      await expectValidatorToPass(validators, 'country', 'strlen', { country: exactString });
    });
  });

  describe('field: lastCameToUk', () => {
    let _now;

    before(() => {
      _now = Date.now;
    });

    after(() => {
      Date.now = _now;
    });

    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'lastCameToUk', 'required', null, {
        summary: 'nationality-details:field.lastCameToUk.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'lastCameToUk', 'required', { lastCameToUk: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should fail "dateObject" validator if value is not a valid date', async () => {
      await expectValidatorToFail(validators, 'lastCameToUk', 'dateObject', { lastCameToUk: 'invalid-input' }, {
        summary: 'nationality-details:field.lastCameToUk.format',
      });
    });

    it('should fail "dateObject" validator if value is beyond today', async () => {
      Date.now = () => (0); // 1970-01-01
      await expectValidatorToFail(validators, 'lastCameToUk', 'dateObject', { lastCameToUk: { mm: 1, dd: 2, yyyy: 1970 } }, {
        summary: 'nationality-details:field.lastCameToUk.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "dateObject" validator if value is before today', async () => {
      Date.now = () => (86400000); // 1970-01-02
      await expectValidatorToPass(validators, 'lastCameToUk', 'dateObject', { lastCameToUk: { mm: 1, dd: 1, yyyy: 1970 } });
    });
  });

  describe('field: cameToUkToWork', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'cameToUkToWork', 'required', null, {
        summary: 'nationality-details:field.cameToUkToWork.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'cameToUkToWork', 'required', { cameToUkToWork: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'cameToUkToWork', 'inArray', { cameToUkToWork: 'bad-value' }, {
        summary: 'nationality-details:field.cameToUkToWork.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'cameToUkToWork', 'inArray', { cameToUkToWork: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'cameToUkToWork', 'inArray', { cameToUkToWork: 'no' });
    });
  });

  describe('field: noRecourseToPublicFunds', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'noRecourseToPublicFunds', 'required', null, {
        summary: 'nationality-details:field.noRecourseToPublicFunds.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'noRecourseToPublicFunds', 'required', { noRecourseToPublicFunds: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'noRecourseToPublicFunds', 'inArray', { noRecourseToPublicFunds: 'bad-value' }, {
        summary: 'nationality-details:field.noRecourseToPublicFunds.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'noRecourseToPublicFunds', 'inArray', { noRecourseToPublicFunds: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'noRecourseToPublicFunds', 'inArray', { noRecourseToPublicFunds: 'no' });
    });
  });

  describe('field: livedInUkBefore', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'livedInUkBefore', 'required', null, {
        summary: 'nationality-details:field.livedInUkBefore.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'livedInUkBefore', 'required', { livedInUkBefore: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'livedInUkBefore', 'inArray', { livedInUkBefore: 'bad-value' }, {
        summary: 'nationality-details:field.livedInUkBefore.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'livedInUkBefore', 'inArray', { livedInUkBefore: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'livedInUkBefore', 'inArray', { livedInUkBefore: 'no' });
    });
  });

  describe('field: lastLeftUk', () => {
    let _now;

    before(() => {
      _now = Date.now;
    });

    after(() => {
      Date.now = _now;
    });

    it('should pass "required" validator if no value is provided and livedInUkBefore is no', async () => {
      await expectValidatorToPass(validators, 'lastLeftUk', 'required', { livedInUkBefore: 'no' });
    });

    it('should fail "required" validator if no value is provided and livedInUkBefore is yes', async () => {
      await expectValidatorToFail(validators, 'lastLeftUk', 'required', { livedInUkBefore: 'yes' }, {
        summary: 'nationality-details:field.lastLeftUk.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "required" validator if a non-empty value is provided and livedInUkBefore is yes', async () => {
      await expectValidatorToPass(validators, 'lastLeftUk', 'required', { livedInUkBefore: 'yes', lastLeftUk: { dd: '01', mm: '02', yyyy: '2000' } });
    });

    it('should pass "dateObject" validator if value is not a valid date but livedInUkBefore is no', async () => {
      await expectValidatorToPass(validators, 'lastLeftUk', 'dateObject', { livedInUkBefore: 'no', lastLeftUk: 'invalid-input' });
    });

    it('should fail "dateObject" validator if value is not a valid date and livedInUkBefore is yes', async () => {
      await expectValidatorToFail(validators, 'lastLeftUk', 'dateObject', { livedInUkBefore: 'yes', lastLeftUk: 'invalid-input' }, {
        summary: 'nationality-details:field.lastLeftUk.format',
      });
    });

    it('should fail "dateObject" validator if value is beyond today', async () => {
      Date.now = () => (0); // 1970-01-01
      await expectValidatorToFail(validators, 'lastLeftUk', 'dateObject', { livedInUkBefore: 'yes', lastLeftUk: { mm: 1, dd: 2, yyyy: 1970 } }, {
        summary: 'nationality-details:field.lastLeftUk.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      });
    });

    it('should pass "dateObject" validator if value is before today', async () => {
      Date.now = () => (86400000); // 1970-01-02
      await expectValidatorToPass(validators, 'lastLeftUk', 'dateObject', { livedInUkBefore: 'yes', lastLeftUk: { mm: 1, dd: 1, yyyy: 1970 } });
    });
  });

  describe('field: familyReunionScheme', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'familyReunionScheme', 'required', null, {
        summary: 'nationality-details:field.familyReunionScheme.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'familyReunionScheme', 'required', { familyReunionScheme: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'familyReunionScheme', 'inArray', { familyReunionScheme: 'bad-value' }, {
        summary: 'nationality-details:field.familyReunionScheme.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'familyReunionScheme', 'inArray', { familyReunionScheme: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'familyReunionScheme', 'inArray', { familyReunionScheme: 'no' });
    });
  });
});
