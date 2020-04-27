const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const jointSingleErrorMsg = require('../../../utils/joint-single-error-message.js');

const fieldValidators = Object.assign(Object.create(null), {
  othersLiveWithYou: sf([
    r.required.bind({
      errorMsg: jointSingleErrorMsg('lives-with-you:field.othersLiveWithYou.required'),
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: jointSingleErrorMsg('lives-with-you:field.othersLiveWithYou.required'),
    }),
  ]),
  othersLiveWithYouDetails: sf([
    r.required.bind({
      errorMsg: 'lives-with-you:field.othersLiveWithYouDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'lives-with-you:field.othersLiveWithYouDetails.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).othersLiveWithYou === 'yes'
  )),
});

module.exports = fieldValidators;
