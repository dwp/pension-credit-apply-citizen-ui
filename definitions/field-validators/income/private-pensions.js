const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  hasPrivatePensions: sf([
    r.required.bind({
      errorMsg: 'private-pensions:field.hasPrivatePensions.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'private-pensions:field.hasPrivatePensions.required',
    }),
  ]),
  privatePensionDetails: sf([
    r.required.bind({
      errorMsg: 'private-pensions:field.privatePensionDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'private-pensions:field.privatePensionDetails.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).hasPrivatePensions === 'yes'
  )),
});

module.exports = fieldValidators;
