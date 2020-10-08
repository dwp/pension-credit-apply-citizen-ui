const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  dateYouLeft: sf([
    r.required.bind({
      errorMsg: {
        summary: 'dates-abroad:field.dateYouLeft.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      errorMsg: {
        summary: 'dates-abroad:field.dateYouLeft.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
      errorMsgBeforeOffset: {
        summary: 'dates-abroad:field.dateYouLeft.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ]),
  dateYouReturned: sf([
    r.required.bind({
      errorMsg: {
        summary: 'dates-abroad:field.dateYouReturned.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      errorMsg: {
        summary: 'dates-abroad:field.dateYouReturned.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
      errorMsgBeforeOffset: {
        summary: 'dates-abroad:field.dateYouReturned.future',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ]),
});

module.exports = fieldValidators;
