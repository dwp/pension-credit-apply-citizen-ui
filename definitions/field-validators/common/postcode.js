const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const isValidPostcode = require('../../../utils/is-valid-postcode.js');

const fieldValidators = Object.assign(Object.create(null), {
  postcode: sf([
    r.required.bind({
      errorMsg: 'postcode:field.postcode.required',
    }),
    isValidPostcode,
  ]),
});

module.exports = fieldValidators;
