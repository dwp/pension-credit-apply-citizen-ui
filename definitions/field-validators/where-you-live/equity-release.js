const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  equityRelease: sf([
    r.required.bind({
      errorMsg: 'equity-release:field.equityRelease.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'equity-release:field.equityRelease.required',
    }),
  ]),
});

module.exports = fieldValidators;
