const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  hasIncomeOrCapitalBonds: sf([
    r.required.bind({
      errorMsg: 'bonds:field.hasIncomeOrCapitalBonds.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'bonds:field.hasIncomeOrCapitalBonds.required',
    }),
  ]),
});

module.exports = fieldValidators;
