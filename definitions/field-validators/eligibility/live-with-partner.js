const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const moment = require('moment');

const fieldValidators = Object.assign(Object.create(null), {
  havePartner: sf([
    r.required.bind({
      errorMsg: 'live-with-partner:field.havePartner.required',
    }),
    r.inArray.bind({
      source: ['yesLiveTogether', 'yesLiveApart', 'no'],
      errorMsg: 'live-with-partner:field.havePartner.required',
    }),
  ]),
  partnerDateOfBirth: sf([
    r.required.bind({
      errorMsg: {
        summary: 'live-with-partner:field.partnerDateOfBirth.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      beforeOffsetFromNow: moment.duration(1, 'days'),
      errorMsg: {
        summary: 'live-with-partner:field.partnerDateOfBirth.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
      errorMsgBeforeOffset: {
        summary: 'live-with-partner:field.partnerDateOfBirth.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).havePartner === 'yesLiveTogether'
  )),
});

module.exports = fieldValidators;
