const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  hasOtherIncome: sf([
    r.required.bind({
      errorMsg: 'other-income:field.hasOtherIncome.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'other-income:field.hasOtherIncome.required',
    }),
  ]),
  otherIncomeDetails: sf([
    r.required.bind({
      errorMsg: 'other-income:field.otherIncomeDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'other-income:field.otherIncomeDetails.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).hasOtherIncome === 'yes'
  )),
});

module.exports = fieldValidators;
