const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const moment = require('moment');

const fieldValidators = Object.assign(Object.create(null), {
  liveWithPartner: sf([
    r.required.bind({
      errorMsg: 'live-with-partner:field.liveWithPartner.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'live-with-partner:field.liveWithPartner.required',
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
    (c.getDataForPage(w) || {}).liveWithPartner === 'yes'
  )),
});

module.exports = fieldValidators;
