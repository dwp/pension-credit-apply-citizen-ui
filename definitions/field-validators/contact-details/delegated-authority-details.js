const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const { waypoints: WP, whoMadeClaim } = require('../../../lib/constants.js');

const fieldValidators = Object.assign(Object.create(null), {
  contactName: sf([
    r.required.bind({
      errorMsg: 'delegated-authority-details:field.contactName.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'delegated-authority-details:field.contactName.length',
    }),
  ]),
  contactNino: sf([
    r.required.bind({
      errorMsg: 'delegated-authority-details:field.contactNino.required',
    }),
    r.nino.bind({
      errorMsg: 'delegated-authority-details:field.contactNino.format',
      allowWhitespace: true,
    }),
  ], ({ journeyContext: c }) => (
    // The contactNino field is not shown for Corporate Acting Bodies
    (c.getDataForPage(WP.WHO_MADE_CLAIM) || {}).whoMadeClaim !== whoMadeClaim.CORPORATE_ACTING_BODY
  )),
  contactID: sf([
    r.required.bind({
      errorMsg: 'delegated-authority-details:field.contactID.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'delegated-authority-details:field.contactID.length',
    }),
  ], ({ journeyContext: c }) => (
    // The cotactID field is only shown for Corporate Acting Bodies
    (c.getDataForPage(WP.WHO_MADE_CLAIM) || {}).whoMadeClaim === whoMadeClaim.CORPORATE_ACTING_BODY
  )),
});

module.exports = fieldValidators;
