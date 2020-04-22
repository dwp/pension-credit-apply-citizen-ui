const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  permanentlyInCareHome: sf([
    r.required.bind({
      errorMsg: 'care-home:field.permanentlyInCareHome.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'care-home:field.permanentlyInCareHome.required',
    }),
  ]),
  stillOwnsHome: sf([
    r.required.bind({
      errorMsg: 'care-home:field.stillOwnsHome.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'care-home:field.stillOwnsHome.required',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).permanentlyInCareHome === 'yes'
  )),
});

module.exports = fieldValidators;
