const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/live-england-scotland-wales.js');

describe('Validators: live-england-scotland-wales', () => {
  describe('field: inEnglandScotlandWales', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'inEnglandScotlandWales', 'required', null, {
        summary: 'live-england-scotland-wales:field.inEnglandScotlandWales.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'inEnglandScotlandWales', 'required', { inEnglandScotlandWales: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'inEnglandScotlandWales', 'inArray', { inEnglandScotlandWales: 'bad-value' }, {
        summary: 'live-england-scotland-wales:field.inEnglandScotlandWales.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'inEnglandScotlandWales', 'inArray', { inEnglandScotlandWales: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'inEnglandScotlandWales', 'inArray', { inEnglandScotlandWales: 'no' });
    });
  });
});
