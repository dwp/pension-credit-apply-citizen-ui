const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  rightToReside: sf([
    r.required.bind({
      errorMsg: 'your-nationality:field.rightToReside.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'your-nationality:field.rightToReside.required',
    }),
  ]),
  lived2Years: sf([
    r.required.bind({
      errorMsg: 'your-nationality:field.lived2Years.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'your-nationality:field.lived2Years.required',
    }),
  ]),
});

module.exports = fieldValidators;
