const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const isValidPostcode = require('../../../utils/is-valid-postcode.js');

const fieldValidators = Object.assign(Object.create(null), {
  addressLine1: sf([
    r.required.bind({
      errorMsg: 'manual-address:field.addressLine1.required',
    }),
    r.strlen.bind({
      max: 100,
      errorMsgMax: 'manual-address:field.addressLine1.length',
    }),
  ]),
  addressLine2: sf([
    r.strlen.bind({
      max: 100,
      errorMsgMax: 'manual-address:field.addressLine2.length',
    }),
  ]),
  town: sf([
    r.strlen.bind({
      max: 100,
      errorMsgMax: 'manual-address:field.town.length',
    }),
  ]),
  county: sf([
    r.strlen.bind({
      max: 100,
      errorMsgMax: 'manual-address:field.county.length',
    }),
  ]),
  postcode: sf([
    r.required.bind({
      errorMsg: 'manual-address:field.postcode.required',
    }),
    isValidPostcode,
  ]),
});

module.exports = fieldValidators;
