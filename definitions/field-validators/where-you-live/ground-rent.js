const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  paysGroundRent: sf([
    r.required.bind({
      errorMsg: 'ground-rent:field.paysGroundRent.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'ground-rent:field.paysGroundRent.required',
    }),
  ]),
});

module.exports = fieldValidators;
