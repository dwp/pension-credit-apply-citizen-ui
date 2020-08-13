const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  asylumSeeker: sf([
    r.required.bind({
      errorMsg: 'asylum-seeker:field.asylumSeeker.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'asylum-seeker:field.asylumSeeker.required',
    }),
  ]),
});

module.exports = fieldValidators;
