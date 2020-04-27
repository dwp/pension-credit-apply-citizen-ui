const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  shareRentMortgage: sf([
    r.required.bind({
      errorMsg: 'share-rent-mortgage:field.shareRentMortgage.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'share-rent-mortgage:field.shareRentMortgage.required',
    }),
  ]),
});

module.exports = fieldValidators;
