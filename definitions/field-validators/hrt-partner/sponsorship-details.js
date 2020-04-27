const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerSponsorName: sf([
    r.required.bind({
      errorMsg: 'partner-sponsorship-details:field.partnerSponsorName.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'partner-sponsorship-details:field.partnerSponsorName.strlen',
    }),
  ]),

  partnerHomeOfficeReference: sf([
    r.required.bind({
      errorMsg: 'partner-sponsorship-details:field.partnerHomeOfficeReference.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'partner-sponsorship-details:field.partnerHomeOfficeReference.strlen',
    }),
  ]),

  partnerSponsorshipUndertakingSigned: sf([
    r.required.bind({
      errorMsg: {
        summary: 'partner-sponsorship-details:field.partnerSponsorshipUndertakingSigned.required',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
    r.dateObject.bind({
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      errorMsg: {
        summary: 'partner-sponsorship-details:field.partnerSponsorshipUndertakingSigned.format',
        focusSuffix: ['[dd]', '[mm]', '[yyyy]'],
      },
    }),
  ]),
});

module.exports = fieldValidators;
