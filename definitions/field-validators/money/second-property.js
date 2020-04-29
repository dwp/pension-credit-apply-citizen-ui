const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  hasSecondProperty: sf([
    r.required.bind({
      errorMsg: 'second-property:field.hasSecondProperty.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'second-property:field.hasSecondProperty.required',
    }),
  ]),
});

module.exports = fieldValidators;
