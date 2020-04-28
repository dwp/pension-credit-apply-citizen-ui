const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../lib/constants.js');
const formatDateObject = require('../../../utils/format-date-object.js');
const needToBackdate = require('../../../utils/need-to-backdate.js');
const isValidMoney = require('../../../utils/is-valid-money.js');

const fieldValidators = Object.assign(Object.create(null), {
  moneyBackdated: sf([
    r.required.bind({
      errorMsg: ({ journeyContext: c }) => ({
        summary: 'money-you-have:field.moneyBackdated.required',
        variables: {
          dateOfClaim: formatDateObject(c.getDataForPage(WP.DATE_OF_CLAIM).dateOfClaim),
        },
      }),
    }),
    isValidMoney({
      errorMsg: ({ journeyContext: c }) => ({
        summary: 'money-you-have:field.moneyBackdated.format',
        variables: {
          dateOfClaim: formatDateObject(c.getDataForPage(WP.DATE_OF_CLAIM).dateOfClaim),
        },
      }),
    }),
  ], ({ journeyContext }) => needToBackdate(journeyContext)),
  moneyToday: sf([
    r.required.bind({
      errorMsg: 'money-you-have:field.moneyToday.required',
    }),
    isValidMoney({
      errorMsg: 'money-you-have:field.moneyToday.format',
    }),
  ]),
});

module.exports = fieldValidators;
