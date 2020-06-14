const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const isValidTelephoneNumber = require('../../../utils/is-valid-telephone-number.js');

const fieldValidators = Object.assign(Object.create(null), {
  contactTelephone: sf([
    r.strlen.bind({
      max: 20,
      errorMsgMax: 'phone-number:field.contactTelephone.length',
    }),
    isValidTelephoneNumber({
      errorMsg: 'phone-number:field.contactTelephone.format',
    }),
  ]),
});

module.exports = fieldValidators;
