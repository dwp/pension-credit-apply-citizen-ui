const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/eligibility/partner-housing-benefit.js');

describe('Validators: partner-housing-benefit', () => {
  describe('field: partnerGetsHousingBenefit', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'partnerGetsHousingBenefit', 'required', null, {
        summary: 'partner-housing-benefit:field.partnerGetsHousingBenefit.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'partnerGetsHousingBenefit', 'required', { partnerGetsHousingBenefit: 'test-value' });
    });

    it('should fail "inArray" validator if value is not one of the valid options', async () => {
      await expectValidatorToFail(validators, 'partnerGetsHousingBenefit', 'inArray', { partnerGetsHousingBenefit: 'bad-value' }, {
        summary: 'partner-housing-benefit:field.partnerGetsHousingBenefit.required',
      });
    });

    it('should pass "inArray" validator if value is yes', async () => {
      await expectValidatorToPass(validators, 'partnerGetsHousingBenefit', 'inArray', { partnerGetsHousingBenefit: 'yes' });
    });

    it('should pass "inArray" validator if value is no', async () => {
      await expectValidatorToPass(validators, 'partnerGetsHousingBenefit', 'inArray', { partnerGetsHousingBenefit: 'no' });
    });
  });
});
