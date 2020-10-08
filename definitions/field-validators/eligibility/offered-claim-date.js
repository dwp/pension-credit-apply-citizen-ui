const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const getOfferedDateOfClaim = require('../../../utils/get-offered-date-of-claim.js');
const isoStringToDateObject = require('../../../utils/iso-string-to-date-object.js');
const formatDateObject = require('../../../utils/format-date-object.js');

const errorMsg = ({ journeyContext }) => ({
  summary: 'offered-claim-date:field.acceptClaimDate.required',
  variables: {
    offeredDateOfClaim: formatDateObject(
      isoStringToDateObject(getOfferedDateOfClaim(journeyContext)),
      { locale: journeyContext.nav.language },
    ),
  },
});

const fieldValidators = Object.assign(Object.create(null), {
  acceptClaimDate: sf([
    r.required.bind({
      errorMsg,
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg,
    }),
  ]),
});

module.exports = fieldValidators;
