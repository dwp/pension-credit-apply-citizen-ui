const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const isValidTelephoneNumber = require('../../../utils/is-valid-telephone-number.js');

const fieldValidators = Object.assign(Object.create(null), {
  contactFormats: sf([
    r.optional,
  ]),
  textPhoneNumber: sf([
    r.required.bind({
      errorMsg: 'contact-formats:field.textPhoneNumber.required',
    }),
    r.strlen.bind({
      max: 20,
      errorMsgMax: 'contact-formats:field.textPhoneNumber.length',
    }),
    isValidTelephoneNumber({
      errorMsg: 'contact-formats:field.textPhoneNumber.format',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    ((c.getDataForPage(w) || {}).contactFormats || []).includes('textPhone')
  )),
  otherDetails: sf([
    r.required.bind({
      errorMsg: 'contact-formats:field.otherDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'contact-formats:field.otherDetails.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    ((c.getDataForPage(w) || {}).contactFormats || []).includes('other')
  )),
});

module.exports = fieldValidators;
