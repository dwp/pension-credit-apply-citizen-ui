const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  inEnglandScotlandWales: sf([
    r.required.bind({
      errorMsg: 'live-england-scotland-wales:field.inEnglandScotlandWales.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'live-england-scotland-wales:field.inEnglandScotlandWales.required',
    }),
  ]),
});

module.exports = fieldValidators;
