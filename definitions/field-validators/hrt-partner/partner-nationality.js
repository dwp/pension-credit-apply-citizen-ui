const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerRightToReside: sf([
    r.required.bind({
      errorMsg: 'partner-nationality:field.partnerRightToReside.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-nationality:field.partnerRightToReside.required',
    }),
  ]),
  partnerLived2Years: sf([
    r.required.bind({
      errorMsg: 'partner-nationality:field.partnerLived2Years.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-nationality:field.partnerLived2Years.required',
    }),
  ]),
});

module.exports = fieldValidators;
