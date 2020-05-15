const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const jointSingleErrorMsg = require('../../../utils/joint-single-error-message.js');

const fieldValidators = Object.assign(Object.create(null), {
  responsibleForCouncilTax: sf([
    r.required.bind({
      errorMsg: jointSingleErrorMsg('rent-council-tax-rates:field.responsibleForCouncilTax.required', true),
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: jointSingleErrorMsg('rent-council-tax-rates:field.responsibleForCouncilTax.required', true),
    }),
  ]),
});

module.exports = fieldValidators;
