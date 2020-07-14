const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const { whoMadeClaim } = require('../../../lib/constants.js');

const fieldValidators = Object.assign(Object.create(null), {
  whoMadeClaim: sf([
    r.required.bind({
      errorMsg: 'who-made-claim:field.whoMadeClaim.required',
    }),
    r.inArray.bind({
      source: [
        whoMadeClaim.CLAIMANT,
        whoMadeClaim.POWER_OF_ATTORNEY,
        whoMadeClaim.APPOINTEE,
        whoMadeClaim.PERSONAL_ACTING_BODY,
        whoMadeClaim.CORPORATE_ACTING_BODY,
        whoMadeClaim.CHARITY,
        whoMadeClaim.FRIEND_OR_FAMILY,
        whoMadeClaim.SOMEONE_ELSE,
      ],
      errorMsg: 'who-made-claim:field.whoMadeClaim.required',
    }),
  ]),
  relationship: sf([
    r.required.bind({
      errorMsg: 'who-made-claim:field.relationship.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'who-made-claim:field.relationship.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).whoMadeClaim === whoMadeClaim.SOMEONE_ELSE
  )),
});

module.exports = fieldValidators;
