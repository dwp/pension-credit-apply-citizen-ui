const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/equity-release.js');

describe('Validators: equity-release', () => {
  describe('field: equityRelease', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'equityRelease', 'required', null, {
        summary: 'equity-release:field.equityRelease.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'equityRelease', 'required', { equityRelease: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'equityRelease', 'inArray', { equityRelease: 'bad-value' }, {
        summary: 'equity-release:field.equityRelease.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'equityRelease', 'inArray', { equityRelease: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'equityRelease', 'inArray', { equityRelease: 'no' });
    });
  });
});
