const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerFullName: sf([
    r.required.bind({
      errorMsg: 'partner-name:field.partnerFullName.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'partner-name:field.partnerFullName.length',
    }),
  ]),
});

module.exports = fieldValidators;
