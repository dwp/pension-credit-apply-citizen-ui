const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerAsylumBefore3April2000: sf([
    r.required.bind({
      errorMsg: 'partner-asylum-application:field.partnerAsylumBefore3April2000.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-asylum-application:field.partnerAsylumBefore3April2000.required',
    }),
  ]),
  partnerSuccessfulDecision: sf([
    r.required.bind({
      errorMsg: 'partner-asylum-application:field.partnerSuccessfulDecision.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-asylum-application:field.partnerSuccessfulDecision.required',
    }),
  ]),
  partnerSuccessfulDecisionDate: sf([
    r.required.bind({
      errorMsg: {
        summary: 'partner-asylum-application:field.partnerSuccessfulDecisionDate.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      errorMsg: {
        summary: 'partner-asylum-application:field.partnerSuccessfulDecisionDate.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).partnerSuccessfulDecision === 'yes'
  )),
  partnerSupportedByHomeOffice: sf([
    r.required.bind({
      errorMsg: 'partner-asylum-application:field.partnerSupportedByHomeOffice.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-asylum-application:field.partnerSupportedByHomeOffice.required',
    }),
  ]),
});

module.exports = fieldValidators;
