const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const getEarliestEntitlementDate = require('../../../utils/get-earliest-entitlement-date.js');
const isoStringToDateObject = require('../../../utils/iso-string-to-date-object.js');
const formatDateObject = require('../../../utils/format-date-object.js');

const errorMsg = ({ journeyContext }) => ({
  summary: 'periods-abroad:field.periodsAbroad.required',
  variables: {
    earliestEntitlementDate: formatDateObject(
      isoStringToDateObject(getEarliestEntitlementDate(journeyContext)),
      { locale: journeyContext.nav.language },
    ),
  },
});

const fieldValidators = Object.assign(Object.create(null), {
  periodsAbroad: sf([
    r.required.bind({
      errorMsg,
    }),
    r.inArray.bind({
      source: ['one', 'moreThanOne'],
      errorMsg,
    }),
  ]),
});

module.exports = fieldValidators;
