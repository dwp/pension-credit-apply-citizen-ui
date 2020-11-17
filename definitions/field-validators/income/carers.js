const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  anyoneGetCarers: sf([
    r.required.bind({
      errorMsg: 'carers:field.anyoneGetCarers.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'carers:field.anyoneGetCarers.required',
    }),
  ]),
});

module.exports = fieldValidators;
