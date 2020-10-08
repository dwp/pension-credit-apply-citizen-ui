const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const jointSingleErrorMsg = require('../../../utils/joint-single-error-message.js');
const getSelfEmploymentVars = require('../../../utils/get-self-employment-vars.js');

const hasEmploymentIncomeErrorMsg = jointSingleErrorMsg('earnings:field.hasEmploymentIncome.required');

const hasSelfEmploymentIncomeErrorMsg = ({ journeyContext: c }) => {
  const msgKey = 'earnings:field.hasSelfEmploymentIncome.required';
  const keyPartner = jointSingleErrorMsg(msgKey)({ journeyContext: c });
  const { selfEmployedSuffix } = getSelfEmploymentVars(c);
  return `${keyPartner}${selfEmployedSuffix}`;
};

const fieldValidators = Object.assign(Object.create(null), {
  hasEmploymentIncome: sf([
    r.required.bind({
      errorMsg: hasEmploymentIncomeErrorMsg,
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: hasEmploymentIncomeErrorMsg,
    }),
  ]),
  hasSelfEmploymentIncome: sf([
    r.required.bind({
      errorMsg: hasSelfEmploymentIncomeErrorMsg,
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: hasSelfEmploymentIncomeErrorMsg,
    }),
  ]),
});

module.exports = fieldValidators;
