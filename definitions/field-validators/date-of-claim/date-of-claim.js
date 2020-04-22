const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  dateOfClaim: sf([
    r.required.bind({
      errorMsg: {
        summary: 'date-of-claim:field.dateOfClaim.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      errorMsg: {
        summary: 'date-of-claim:field.dateOfClaim.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ]),
});

module.exports = fieldValidators;
