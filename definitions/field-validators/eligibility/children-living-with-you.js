const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  hasChildren: sf([
    r.required.bind({
      errorMsg: 'children-living-with-you:field.hasChildren.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'children-living-with-you:field.hasChildren.required',
    }),
  ]),
});

module.exports = fieldValidators;
