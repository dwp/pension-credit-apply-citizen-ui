const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const isValidPostcode = require('../../../utils/is-valid-postcode.js');

const fieldValidators = (key = '', func = (m) => m) => Object.assign(Object.create(null), {
  postcode: sf([
    r.required.bind({
      errorMsg: func(`postcode:field.postcode.required${key}`),
    }),
    isValidPostcode,
  ]),
});

module.exports = fieldValidators;
