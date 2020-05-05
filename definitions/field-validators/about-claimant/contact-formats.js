const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const isValidTelephoneNumber = require('../../../utils/is-valid-telephone-number.js');

// Validation is conditional on whether the associated checkbox was checked
const contactFormatsIncludes = (format) => ({ journeyContext: c, waypointId }) => {
  const { contactFormats } = c.getDataForPage(waypointId) || Object.create(null);
  const formats = Array.isArray(contactFormats) ? contactFormats : [contactFormats];
  return formats.includes(format);
};

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
  ], contactFormatsIncludes('textPhone')),
  otherDetails: sf([
    r.required.bind({
      errorMsg: 'contact-formats:field.otherDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'contact-formats:field.otherDetails.length',
    }),
  ], contactFormatsIncludes('other')),
});

module.exports = fieldValidators;
