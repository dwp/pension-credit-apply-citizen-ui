const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  twentyOneYearLease: sf([
    r.required.bind({
      errorMsg: '21-year-lease:field.twentyOneYearLease.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: '21-year-lease:field.twentyOneYearLease.required',
    }),
  ]),
});

module.exports = fieldValidators;
