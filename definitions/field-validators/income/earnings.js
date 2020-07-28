const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  hasEmploymentIncome: sf([
    r.required.bind({
      errorMsg: 'earnings:field.hasEmploymentIncome.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'earnings:field.hasEmploymentIncome.required',
    }),
  ]),
  hasSelfEmploymentIncome: sf([
    r.required.bind({
      errorMsg: 'earnings:field.hasSelfEmploymentIncome.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'earnings:field.hasSelfEmploymentIncome.required',
    }),
  ]),
  selfEmploymentIncomeDetails: sf([
    r.required.bind({
      errorMsg: 'earnings:field.selfEmploymentIncomeDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'earnings:field.selfEmploymentIncomeDetails.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).hasSelfEmploymentIncome === 'yes'
  )),
});

module.exports = fieldValidators;
