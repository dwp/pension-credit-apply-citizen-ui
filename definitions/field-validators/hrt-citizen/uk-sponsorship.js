const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  sponsorshipUndertaking: sf([
    r.required.bind({
      errorMsg: 'uk-sponsorship:field.sponsorshipUndertaking.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'uk-sponsorship:field.sponsorshipUndertaking.required',
    }),
  ]),
});

module.exports = fieldValidators;
