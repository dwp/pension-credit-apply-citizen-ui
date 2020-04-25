const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  sponsorName: sf([
    r.required.bind({
      errorMsg: 'sponsorship-details:field.sponsorName.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'sponsorship-details:field.sponsorName.strlen',
    }),
  ]),

  homeOfficeReference: sf([
    r.required.bind({
      errorMsg: 'sponsorship-details:field.homeOfficeReference.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'sponsorship-details:field.homeOfficeReference.strlen',
    }),
  ]),

  sponsorshipUndertakingSigned: sf([
    r.required.bind({
      errorMsg: {
        summary: 'sponsorship-details:field.sponsorshipUndertakingSigned.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      errorMsg: {
        summary: 'sponsorship-details:field.sponsorshipUndertakingSigned.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ]),
});

module.exports = fieldValidators;
