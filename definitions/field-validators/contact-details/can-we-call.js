const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const isValidTelephoneNumber = require('../../../utils/is-valid-telephone-number.js');
const daErrorMessage = require('../../../utils/delegated-authority-error-message.js');

const fieldValidators = Object.assign(Object.create(null), {
  canWeCall: sf([
    r.required.bind({
      errorMsg: daErrorMessage('can-we-call:field.canWeCall.required'),
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: daErrorMessage('can-we-call:field.canWeCall.required'),
    }),
  ]),
  contactTelephone: sf([
    r.required.bind({
      errorMsg: daErrorMessage('can-we-call:field.contactTelephone.required'),
    }),
    r.strlen.bind({
      max: 20,
      errorMsgMax: daErrorMessage('can-we-call:field.contactTelephone.length'),
    }),
    isValidTelephoneNumber({
      errorMsg: daErrorMessage('can-we-call:field.contactTelephone.format'),
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).canWeCall === 'yes'
  )),
});

module.exports = fieldValidators;
