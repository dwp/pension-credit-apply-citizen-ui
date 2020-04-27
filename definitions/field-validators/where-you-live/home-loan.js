const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  wantsSMI: sf([
    r.required.bind({
      errorMsg: 'home-loan:field.wantsSMI.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'home-loan:field.wantsSMI.required',
    }),
  ]),
});

module.exports = fieldValidators;
