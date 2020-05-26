const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/home-ownership.js');

describe('Validators: home-ownership', () => {
  describe('field: homeOwnership', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'homeOwnership', 'required', null, {
        summary: 'home-ownership:field.homeOwnership.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'homeOwnership', 'required', { homeOwnership: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'homeOwnership', 'inArray', { homeOwnership: 'bad-value' }, {
        summary: 'home-ownership:field.homeOwnership.required',
      });
    });

    it('should pass "inArray" validator if value is own', async () => {
      await expectValidatorToPass(validators, 'homeOwnership', 'inArray', { homeOwnership: 'own' });
    });

    it('should pass "inArray" validator if value is rent', async () => {
      await expectValidatorToPass(validators, 'homeOwnership', 'inArray', { homeOwnership: 'rent' });
    });

    it('should pass "inArray" validator if value is other', async () => {
      await expectValidatorToPass(validators, 'homeOwnership', 'inArray', { homeOwnership: 'other' });
    });

    it('should pass "inArray" validator if value is sharedOwnership', async () => {
      await expectValidatorToPass(validators, 'homeOwnership', 'inArray', { homeOwnership: 'sharedOwnership' });
    });
  });

  describe('field: homeDescription', () => {
    it('should pass "required" validator if no value is provided and homeOwnership is own', async () => {
      await expectValidatorToPass(validators, 'homeDescription', 'required', { homeOwnership: 'own' });
    });

    it('should pass "required" validator if no value is provided and homeOwnership is rent', async () => {
      await expectValidatorToPass(validators, 'homeDescription', 'required', { homeOwnership: 'rent' });
    });

    it('should pass "required" validator if no value is provided and homeOwnership is sharedOwnership', async () => {
      await expectValidatorToPass(validators, 'homeDescription', 'required', { homeOwnership: 'sharedOwnership' });
    });

    it('should fail "required" validator if no value is provided and homeOwnership is other', async () => {
      await expectValidatorToFail(validators, 'homeDescription', 'required', { homeOwnership: 'other' }, {
        summary: 'home-ownership:field.homeDescription.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and homeOwnership is other', async () => {
      await expectValidatorToPass(validators, 'homeDescription', 'required', { homeOwnership: 'other', homeDescription: 'a-description' });
    });

    it('should pass "strlen" validator if string length > 500 and homeOwnership is own', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'homeDescription', 'required', { homeOwnership: 'own', homeDescription: longString });
    });

    it('should pass "strlen" validator if string length > 500 and homeOwnership is sharedOwnership', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'homeDescription', 'required', { homeOwnership: 'sharedOwnership', homeDescription: longString });
    });

    it('should pass "strlen" validator if string length > 500 and homeOwnership is rent', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'homeDescription', 'required', { homeOwnership: 'rent', homeDescription: longString });
    });

    it('should fail "strlen" validator if string length > 500 and homeOwnership is other', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'homeDescription', 'strlen', { homeOwnership: 'other', homeDescription: longString }, {
        summary: 'home-ownership:field.homeDescription.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and homeOwnership other', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'previousNames', 'strlen', { homeOwnership: 'other', previousNames: longString });
    });
  });
});
