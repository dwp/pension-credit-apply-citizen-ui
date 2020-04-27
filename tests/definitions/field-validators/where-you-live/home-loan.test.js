const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/where-you-live/home-loan.js');

describe('Validators: home-loan', () => {
  describe('field: wantsSMI', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'wantsSMI', 'required', null, {
        summary: 'home-loan:field.wantsSMI.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'wantsSMI', 'required', { wantsSMI: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'wantsSMI', 'inArray', { wantsSMI: 'bad-value' }, {
        summary: 'home-loan:field.wantsSMI.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'wantsSMI', 'inArray', { wantsSMI: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'wantsSMI', 'inArray', { wantsSMI: 'no' });
    });
  });
});
