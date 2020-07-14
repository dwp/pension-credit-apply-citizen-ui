const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const daErrorMessage = require('../../../utils/delegated-authority-error-message.js');

const fieldValidators = Object.assign(Object.create(null), {
  needsDifferentFormats: sf([
    r.required.bind({
      errorMsg: daErrorMessage('different-formats:field.needsDifferentFormats.required'),
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: daErrorMessage('different-formats:field.needsDifferentFormats.required'),
    }),
  ]),
});

module.exports = fieldValidators;
