const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const isValidMoney = require('../../../utils/is-valid-money.js');

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
  serviceChargesAmount: sf([
    r.required.bind({
      errorMsg: 'service-charges:field.serviceChargesAmount.required',
    }),
    isValidMoney({
      errorMsg: 'service-charges:field.serviceChargesAmount.format',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).paysServiceCharges === 'yes'
  )),
  paysGroundRent: sf([
    r.required.bind({
      errorMsg: 'service-charges:field.paysGroundRent.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'service-charges:field.paysGroundRent.required',
    }),
  ]),
  groundRentAmount: sf([
    r.required.bind({
      errorMsg: 'service-charges:field.groundRentAmount.required',
    }),
    isValidMoney({
      errorMsg: 'service-charges:field.groundRentAmount.format',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).paysGroundRent === 'yes'
  )),
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
