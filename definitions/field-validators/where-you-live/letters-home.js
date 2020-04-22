const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  sendLettersToHome: sf([
    r.required.bind({
      errorMsg: 'letters-home:field.sendLettersToHome.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'letters-home:field.sendLettersToHome.required',
    }),
  ]),
});

module.exports = fieldValidators;
