const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const jointSingleErrorMsg = require('../../../utils/joint-single-error-message.js');

const hasEmploymentIncomeErrorMsg = jointSingleErrorMsg('employment:field.hasEmploymentIncome.required');

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
  employerDetails: sf([
    r.required.bind({
      errorMsg: 'employment:field.employerDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'employment:field.employerDetails.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).hasEmploymentIncome === 'yes'
  )),
});

module.exports = fieldValidators;
