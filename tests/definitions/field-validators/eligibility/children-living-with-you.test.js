const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/children-living-with-you.js');

describe('Validators: children-living-with-you', () => {
  describe('field: hasChildren', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'hasChildren', 'required', null, {
        summary: 'children-living-with-you:field.hasChildren.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'hasChildren', 'required', { hasChildren: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'hasChildren', 'inArray', { hasChildren: 'bad-value' }, {
        summary: 'children-living-with-you:field.hasChildren.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'hasChildren', 'inArray', { hasChildren: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'hasChildren', 'inArray', { hasChildren: 'no' });
    });
  });
});
