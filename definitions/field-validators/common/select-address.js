const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = (key = '') => Object.assign(Object.create(null), {
  uprn: sf([
    r.required.bind({
      errorMsg: `select-address:field.address.required${key}`,
    }),
    r.regex.bind({
      pattern: /^\d{1,12}$/,
      errorMsg: `select-address:field.address.required${key}`,
    }),
  ]),
});

module.exports = fieldValidators;
