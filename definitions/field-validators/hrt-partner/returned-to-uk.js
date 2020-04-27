const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerCameToUk: sf([
    r.required.bind({
      errorMsg: 'partner-returned-to-uk:field.partnerCameToUk.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-returned-to-uk:field.partnerCameToUk.required',
    }),
  ]),
});

module.exports = fieldValidators;
