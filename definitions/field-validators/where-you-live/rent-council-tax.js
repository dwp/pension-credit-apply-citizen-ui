const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const jointSingleErrorMsg = require('../../../utils/joint-single-error-message.js');

const fieldValidators = Object.assign(Object.create(null), {
  responsibleForCouncilTax: sf([
    r.required.bind({
      errorMsg: jointSingleErrorMsg('rent-council-tax:field.responsibleForCouncilTax.required'),
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: jointSingleErrorMsg('rent-council-tax:field.responsibleForCouncilTax.required'),
    }),
  ]),
});

module.exports = fieldValidators;
