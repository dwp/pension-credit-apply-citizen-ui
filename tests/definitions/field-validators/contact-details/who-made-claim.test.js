const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/contact-details/who-made-claim.js');

describe('Validators: who-made-claim', () => {
  describe('field: whoMadeClaim', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'whoMadeClaim', 'required', null, {
        summary: 'who-made-claim:field.whoMadeClaim.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'whoMadeClaim', 'required', { whoMadeClaim: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'whoMadeClaim', 'inArray', { whoMadeClaim: 'bad-value' }, {
        summary: 'who-made-claim:field.whoMadeClaim.required',
      });
    });

    it('should pass "inArray" validator if value is claimant', async () => {
      await expectValidatorToPass(validators, 'whoMadeClaim', 'inArray', { whoMadeClaim: 'claimant' });
    });

    it('should pass "inArray" validator if value is powerOfAttorney', async () => {
      await expectValidatorToPass(validators, 'whoMadeClaim', 'inArray', { whoMadeClaim: 'powerOfAttorney' });
    });

    it('should pass "inArray" validator if value is appointee', async () => {
      await expectValidatorToPass(validators, 'whoMadeClaim', 'inArray', { whoMadeClaim: 'appointee' });
    });

    it('should pass "inArray" validator if value is personalActingBody', async () => {
      await expectValidatorToPass(validators, 'whoMadeClaim', 'inArray', { whoMadeClaim: 'personalActingBody' });
    });

    it('should pass "inArray" validator if value is corporateActingBody', async () => {
      await expectValidatorToPass(validators, 'whoMadeClaim', 'inArray', { whoMadeClaim: 'corporateActingBody' });
    });

    it('should pass "inArray" validator if value is charity', async () => {
      await expectValidatorToPass(validators, 'whoMadeClaim', 'inArray', { whoMadeClaim: 'charity' });
    });

    it('should pass "inArray" validator if value is friendOrFamily', async () => {
      await expectValidatorToPass(validators, 'whoMadeClaim', 'inArray', { whoMadeClaim: 'friendOrFamily' });
    });

    it('should pass "inArray" validator if value is someoneElse', async () => {
      await expectValidatorToPass(validators, 'whoMadeClaim', 'inArray', { whoMadeClaim: 'someoneElse' });
    });
  });

  describe('field: relationship', () => {
    it('should pass "required" validator if no value is provided and whoMadeClaim is not "someoneElse"', async () => {
      await expectValidatorToPass(validators, 'relationship', 'required', { whoMadeClaim: 'charity' });
    });

    it('should fail "required" validator if no value is provided and whoMadeClaim is "someoneElse"', async () => {
      await expectValidatorToFail(validators, 'relationship', 'required', { whoMadeClaim: 'someoneElse' }, {
        summary: 'who-made-claim:field.relationship.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided and whoMadeClaim is "someoneElse"', async () => {
      await expectValidatorToPass(validators, 'relationship', 'required', { whoMadeClaim: 'someoneElse', relationship: 'Carer' });
    });

    it('should pass "strlen" validator if string length > 500 and whoMadeClaim is not "someoneElse"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToPass(validators, 'relationship', 'required', { whoMadeClaim: 'charity', relationship: longString });
    });

    it('should fail "strlen" validator if string length > 500 and whoMadeClaim is "someoneElse"', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'relationship', 'strlen', { whoMadeClaim: 'someoneElse', relationship: longString }, {
        summary: 'who-made-claim:field.relationship.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500 and whoMadeClaim is "someoneElse"', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'relationship', 'strlen', { whoMadeClaim: 'someoneElse', relationship: longString });
    });
  });
});
