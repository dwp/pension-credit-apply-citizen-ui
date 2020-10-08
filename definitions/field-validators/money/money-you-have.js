const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const getChosenDateOfClaim = require('../../../utils/get-chosen-date-of-claim.js');
const isoStringToDateObject = require('../../../utils/iso-string-to-date-object.js');
const formatDateObject = require('../../../utils/format-date-object.js');
const needToBackdate = require('../../../utils/need-to-backdate.js');
const isValidMoney = require('../../../utils/is-valid-money.js');

const backDatingErrorMsg = (errorMsg) => ({ journeyContext }) => {
  const chosenDateOfClaimISO = getChosenDateOfClaim(journeyContext);
  const chosenDateOfClaim = chosenDateOfClaimISO && formatDateObject(
    isoStringToDateObject(chosenDateOfClaimISO),
    { locale: journeyContext.nav.language },
  );

  return { summary: errorMsg, variables: { chosenDateOfClaim } };
};

const fieldValidators = Object.assign(Object.create(null), {
  moneyBackdated: sf([
    r.required.bind({
      errorMsg: backDatingErrorMsg('money-you-have:field.moneyBackdated.required'),
    }),
    isValidMoney({
      errorMsg: backDatingErrorMsg('money-you-have:field.moneyBackdated.format'),
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
