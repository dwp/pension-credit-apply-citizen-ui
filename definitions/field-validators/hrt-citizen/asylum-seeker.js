const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  asylumSeeker: sf([
    r.required.bind({
      errorMsg: 'asylum-seeker:field.asylumSeeker.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'asylum-seeker:field.asylumSeeker.required',
    }),
  ]),

  asylumBefore3April2000: sf([
    r.required.bind({
      errorMsg: 'asylum-seeker:field.asylumBefore3April2000.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'asylum-seeker:field.asylumBefore3April2000.required',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).asylumSeeker === 'yes'
  )),

  successfulDecision: sf([
    r.required.bind({
      errorMsg: 'asylum-seeker:field.successfulDecision.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'asylum-seeker:field.successfulDecision.required',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).asylumSeeker === 'yes'
  )),

  successfulDecisionDate: sf([
    r.required.bind({
      errorMsg: {
        summary: 'asylum-seeker:field.successfulDecisionDate.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      errorMsg: {
        summary: 'asylum-seeker:field.successfulDecisionDate.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).successfulDecision === 'yes'
  )),

  supportedByHomeOffice: sf([
    r.required.bind({
      errorMsg: 'asylum-seeker:field.supportedByHomeOffice.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'asylum-seeker:field.supportedByHomeOffice.required',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).asylumSeeker === 'yes'
  )),
});

module.exports = fieldValidators;
