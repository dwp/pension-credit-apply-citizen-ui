const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerSponsorshipUndertaking: sf([
    r.required.bind({
      errorMsg: 'partner-uk-sponsorship:field.partnerSponsorshipUndertaking.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-uk-sponsorship:field.partnerSponsorshipUndertaking.required',
    }),
  ]),
});

module.exports = fieldValidators;
