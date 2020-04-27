const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerAsylumSeeker: sf([
    r.required.bind({
      errorMsg: 'partner-asylum-seeker:field.partnerAsylumSeeker.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-asylum-seeker:field.partnerAsylumSeeker.required',
    }),
  ]),

  partnerAsylumBefore3April2000: sf([
    r.required.bind({
      errorMsg: 'partner-asylum-seeker:field.partnerAsylumBefore3April2000.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-asylum-seeker:field.partnerAsylumBefore3April2000.required',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).partnerAsylumSeeker === 'yes'
  )),

  partnerSuccessfulDecision: sf([
    r.required.bind({
      errorMsg: 'partner-asylum-seeker:field.partnerSuccessfulDecision.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-asylum-seeker:field.partnerSuccessfulDecision.required',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).partnerAsylumSeeker === 'yes'
  )),

  partnerSuccessfulDecisionDate: sf([
    r.required.bind({
      errorMsg: {
        summary: 'partner-asylum-seeker:field.partnerSuccessfulDecisionDate.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      errorMsg: {
        summary: 'partner-asylum-seeker:field.partnerSuccessfulDecisionDate.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).partnerSuccessfulDecision === 'yes'
  )),

  partnerSupportedByHomeOffice: sf([
    r.required.bind({
      errorMsg: 'partner-asylum-seeker:field.partnerSupportedByHomeOffice.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-asylum-seeker:field.partnerSupportedByHomeOffice.required',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).partnerAsylumSeeker === 'yes'
  )),
});

module.exports = fieldValidators;
