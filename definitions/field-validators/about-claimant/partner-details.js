const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerFullName: sf([
    r.required.bind({
      errorMsg: 'partner-details:field.partnerFullName.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'partner-details:field.partnerFullName.length',
    }),
  ]),
  partnerHasPreviousNames: sf([
    r.required.bind({
      errorMsg: 'partner-details:field.partnerHasPreviousNames.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-details:field.partnerHasPreviousNames.required',
    }),
  ]),
  partnerPreviousNames: sf([
    r.required.bind({
      errorMsg: 'partner-details:field.partnerPreviousNames.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'partner-details:field.partnerPreviousNames.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).partnerHasPreviousNames === 'yes'
  )),
  partnerNino: sf([
    r.required.bind({
      errorMsg: 'partner-details:field.partnerNino.required',
    }),
    r.nino.bind({
      errorMsg: 'partner-details:field.partnerNino.format',
      allowWhitespace: true,
    }),
  ]),
  partnerRegisteredBlind: sf([
    r.required.bind({
      errorMsg: 'partner-details:field.partnerRegisteredBlind.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-details:field.partnerRegisteredBlind.required',
    }),
  ]),
});

module.exports = fieldValidators;
