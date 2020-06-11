const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerFullName: sf([
    r.required.bind({
      errorMsg: 'partner-name:field.partnerFullName.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'partner-name:field.partnerFullName.length',
    }),
  ]),
  partnerHasPreviousNames: sf([
    r.required.bind({
      errorMsg: 'partner-name:field.partnerHasPreviousNames.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-name:field.partnerHasPreviousNames.required',
    }),
  ]),
  partnerPreviousNames: sf([
    r.required.bind({
      errorMsg: 'partner-name:field.partnerPreviousNames.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'partner-name:field.partnerPreviousNames.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).partnerHasPreviousNames === 'yes'
  )),
});

module.exports = fieldValidators;
