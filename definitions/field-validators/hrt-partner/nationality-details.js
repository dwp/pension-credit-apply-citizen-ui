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

  partnerLastCameToUk: sf([
    r.required.bind({
      errorMsg: {
        summary: 'partner-nationality-details:field.partnerLastCameToUk.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      beforeOffsetFromNow: moment.duration(1, 'days'),
      errorMsg: {
        summary: 'partner-nationality-details:field.partnerLastCameToUk.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
      errorMsgBeforeOffset: {
        summary: 'partner-nationality-details:field.partnerLastCameToUk.future',
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

  partnerLastLeftUk: sf([
    r.required.bind({
      errorMsg: {
        summary: 'partner-nationality-details:field.partnerLastLeftUk.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      beforeOffsetFromNow: moment.duration(1, 'days'),
      errorMsg: {
        summary: 'partner-nationality-details:field.partnerLastLeftUk.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
      errorMsgBeforeOffset: {
        summary: 'partner-nationality-details:field.partnerLastLeftUk.future',
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
