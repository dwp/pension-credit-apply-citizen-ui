const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const moment = require('moment');

const fieldValidators = Object.assign(Object.create(null), {
  nationality: sf([
    r.required.bind({
      errorMsg: 'nationality-details:field.nationality.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'nationality-details:field.nationality.strlen',
    }),
  ]),

  country: sf([
    r.required.bind({
      errorMsg: 'nationality-details:field.country.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'nationality-details:field.country.strlen',
    }),
  ]),

  lastCameToUK: sf([
    r.required.bind({
      errorMsg: {
        summary: 'nationality-details:field.lastCameToUK.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      beforeOffsetFromNow: moment.duration(1, 'days'),
      errorMsg: {
        summary: 'nationality-details:field.lastCameToUK.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
      errorMsgBeforeOffset: {
        summary: 'nationality-details:field.lastCameToUK.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ]),

  cameToUkToWork: sf([
    r.required.bind({
      errorMsg: 'nationality-details:field.cameToUkToWork.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'nationality-details:field.cameToUkToWork.required',
    }),
  ]),

  noRecourseToPublicFunds: sf([
    r.required.bind({
      errorMsg: 'nationality-details:field.noRecourseToPublicFunds.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'nationality-details:field.noRecourseToPublicFunds.required',
    }),
  ]),

  livedInUkBefore: sf([
    r.required.bind({
      errorMsg: 'nationality-details:field.livedInUkBefore.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'nationality-details:field.livedInUkBefore.required',
    }),
  ]),

  lastLeftUK: sf([
    r.required.bind({
      errorMsg: {
        summary: 'nationality-details:field.lastLeftUK.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      beforeOffsetFromNow: moment.duration(1, 'days'),
      errorMsg: {
        summary: 'nationality-details:field.lastLeftUK.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
      errorMsgBeforeOffset: {
        summary: 'nationality-details:field.lastLeftUK.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).livedInUkBefore === 'yes'
  )),

  familyReunionScheme: sf([
    r.required.bind({
      errorMsg: 'nationality-details:field.familyReunionScheme.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'nationality-details:field.familyReunionScheme.required',
    }),
  ]),
});

module.exports = fieldValidators;
