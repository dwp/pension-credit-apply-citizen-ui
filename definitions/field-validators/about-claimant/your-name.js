const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  fullName: sf([
    r.required.bind({
      errorMsg: 'your-name:field.fullName.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'your-name:field.fullName.length',
    }),
  ]),
});

module.exports = fieldValidators;
