const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const { waypoints } = require('../../../lib/constants.js');

const errorMsg = ({ journeyContext }) => {
  const { periodsAbroad } = journeyContext.getDataForPage(waypoints.PERIODS_ABROAD) || {};
  const suffix = periodsAbroad === 'moreThanOne' ? 'Plural' : '';
  return { summary: `abroad-medical:field.periodAbroadForMedical.required${suffix}` };
};

const fieldValidators = Object.assign(Object.create(null), {
  periodAbroadForMedical: sf([
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
