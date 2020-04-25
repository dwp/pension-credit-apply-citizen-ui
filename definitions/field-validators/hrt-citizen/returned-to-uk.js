const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  cameToUk: sf([
    r.required.bind({
      errorMsg: 'returned-to-uk:field.cameToUk.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'returned-to-uk:field.cameToUk.required',
    }),
  ]),
});

module.exports = fieldValidators;
