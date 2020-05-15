const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  countryOfResidence: sf([
    r.required.bind({
      errorMsg: 'country-you-live-in:field.countryOfResidence.required',
    }),
    r.inArray.bind({
      source: ['ENGLAND', 'SCOTLAND', 'WALES', 'NORTHERN_IRELAND', 'somewhereElse'],
      errorMsg: 'country-you-live-in:field.countryOfResidence.required',
    }),
  ]),
});

module.exports = fieldValidators;
