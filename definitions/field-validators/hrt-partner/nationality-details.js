const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const moment = require('moment');

const fieldValidators = Object.assign(Object.create(null), {
  partnerNationality: sf([
    r.required.bind({
      errorMsg: 'partner-nationality-details:field.partnerNationality.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'partner-nationality-details:field.partnerNationality.strlen',
    }),
  ]),

  partnerCountry: sf([
    r.required.bind({
      errorMsg: 'partner-nationality-details:field.partnerCountry.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'partner-nationality-details:field.partnerCountry.strlen',
    }),
  ]),

  partnerLastCameToUK: sf([
    r.required.bind({
      errorMsg: {
        summary: 'partner-nationality-details:field.partnerLastCameToUK.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      beforeOffsetFromNow: moment.duration(1, 'days'),
      errorMsg: {
        summary: 'partner-nationality-details:field.partnerLastCameToUK.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
      errorMsgBeforeOffset: {
        summary: 'partner-nationality-details:field.partnerLastCameToUK.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ]),

  partnerCameToUkToWork: sf([
    r.required.bind({
      errorMsg: 'partner-nationality-details:field.partnerCameToUkToWork.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-nationality-details:field.partnerCameToUkToWork.required',
    }),
  ]),

  partnerNoRecourseToPublicFunds: sf([
    r.required.bind({
      errorMsg: 'partner-nationality-details:field.partnerNoRecourseToPublicFunds.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-nationality-details:field.partnerNoRecourseToPublicFunds.required',
    }),
  ]),

  partnerLivedInUkBefore: sf([
    r.required.bind({
      errorMsg: 'partner-nationality-details:field.partnerLivedInUkBefore.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-nationality-details:field.partnerLivedInUkBefore.required',
    }),
  ]),

  partnerLastLeftUK: sf([
    r.required.bind({
      errorMsg: {
        summary: 'partner-nationality-details:field.partnerLastLeftUK.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      beforeOffsetFromNow: moment.duration(1, 'days'),
      errorMsg: {
        summary: 'partner-nationality-details:field.partnerLastLeftUK.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
      errorMsgBeforeOffset: {
        summary: 'partner-nationality-details:field.partnerLastLeftUK.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).partnerLivedInUkBefore === 'yes'
  )),

  partnerFamilyReunionScheme: sf([
    r.required.bind({
      errorMsg: 'partner-nationality-details:field.partnerFamilyReunionScheme.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-nationality-details:field.partnerFamilyReunionScheme.required',
    }),
  ]),
});

module.exports = fieldValidators;
