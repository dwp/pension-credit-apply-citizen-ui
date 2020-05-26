const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  homeOwnership: sf([
    r.required.bind({
      errorMsg: 'home-ownership:field.homeOwnership.required',
    }),
    r.inArray.bind({
      source: [
        'own',
        'rent',
        'sharedOwnership',
        'other',
      ],
      errorMsg: 'home-ownership:field.homeOwnership.required',
    }),
  ]),
  homeDescription: sf([
    r.required.bind({
      errorMsg: 'home-ownership:field.homeDescription.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'home-ownership:field.homeDescription.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).homeOwnership === 'other'
  )),
});

module.exports = fieldValidators;
