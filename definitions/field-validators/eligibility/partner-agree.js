const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerAgree: sf([
    r.required.bind({
      errorMsg: 'partner-agree:field.partnerAgree.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-agree:field.partnerAgree.required',
    }),
  ]),
});

module.exports = fieldValidators;
