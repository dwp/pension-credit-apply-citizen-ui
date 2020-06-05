const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const jointSingleErrorMsg = require('../../../utils/joint-single-error-message.js');
const rentOrMortgage = require('../../../utils/rent-or-mortgage.js');

const dynamicMessage = ({ journeyContext }) => {
  const messageKey = 'share-rent-mortgage:field.shareRentMortgage.required';
  const type = rentOrMortgage(journeyContext);
  return jointSingleErrorMsg(`${messageKey}${type}`)({ journeyContext });
};

const fieldValidators = Object.assign(Object.create(null), {
  shareRentMortgage: sf([
    r.required.bind({
      errorMsg: dynamicMessage,
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: dynamicMessage,
    }),
  ]),
});

module.exports = fieldValidators;
