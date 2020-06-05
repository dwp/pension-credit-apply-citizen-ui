const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  getsHousingBenefit: sf([
    r.required.bind({
      errorMsg: 'housing-benefit:field.getsHousingBenefit.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'housing-benefit:field.getsHousingBenefit.required',
    }),
  ]),
  wantsHousingBenefit: sf([
    r.required.bind({
      errorMsg: 'housing-benefit:field.wantsHousingBenefit.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'housing-benefit:field.wantsHousingBenefit.required',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).getsHousingBenefit === 'no'
  )),
});

module.exports = fieldValidators;
