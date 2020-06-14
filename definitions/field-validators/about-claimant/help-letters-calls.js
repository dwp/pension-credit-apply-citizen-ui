const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  helpWithLettersPhone: sf([
    r.required.bind({
      errorMsg: 'help-letters-calls:field.helpWithLettersPhone.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'help-letters-calls:field.helpWithLettersPhone.required',
    }),
  ]),
});

module.exports = fieldValidators;
