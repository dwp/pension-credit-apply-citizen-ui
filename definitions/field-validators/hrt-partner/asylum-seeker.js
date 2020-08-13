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
});

module.exports = fieldValidators;
