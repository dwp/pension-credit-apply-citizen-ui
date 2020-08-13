const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  asylumBefore3April2000: sf([
    r.required.bind({
      errorMsg: 'asylum-application:field.asylumBefore3April2000.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'asylum-application:field.asylumBefore3April2000.required',
    }),
  ]),
  successfulDecision: sf([
    r.required.bind({
      errorMsg: 'asylum-application:field.successfulDecision.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'asylum-application:field.successfulDecision.required',
    }),
  ]),
  successfulDecisionDate: sf([
    r.required.bind({
      errorMsg: {
        summary: 'asylum-application:field.successfulDecisionDate.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      errorMsg: {
        summary: 'asylum-application:field.successfulDecisionDate.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).successfulDecision === 'yes'
  )),
  supportedByHomeOffice: sf([
    r.required.bind({
      errorMsg: 'asylum-application:field.supportedByHomeOffice.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'asylum-application:field.supportedByHomeOffice.required',
    }),
  ]),
});

module.exports = fieldValidators;
