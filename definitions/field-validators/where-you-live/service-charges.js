const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  paysServiceCharges: sf([
    r.required.bind({
      errorMsg: 'service-charges:field.paysServiceCharges.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'service-charges:field.paysServiceCharges.required',
    }),
  ]),
  paysGroundRent: sf([
    r.required.bind({
      errorMsg: 'service-charges:field.paysGroundRent.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'service-charges:field.paysGroundRent.required',
    }),
  ]),
  getsHousingBenefit: sf([
    r.required.bind({
      errorMsg: 'service-charges:field.getsHousingBenefit.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'service-charges:field.getsHousingBenefit.required',
    }),
  ]),
  wantsHousingBenefit: sf([
    r.required.bind({
      errorMsg: 'service-charges:field.wantsHousingBenefit.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'service-charges:field.wantsHousingBenefit.required',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).getsHousingBenefit === 'no'
  )),
});

module.exports = fieldValidators;
