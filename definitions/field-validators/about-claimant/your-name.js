const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  fullName: sf([
    r.required.bind({
      errorMsg: 'your-name:field.fullName.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'your-name:field.fullName.length',
    }),
  ]),
  hasPreviousNames: sf([
    r.required.bind({
      errorMsg: 'your-name:field.hasPreviousNames.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'your-name:field.hasPreviousNames.required',
    }),
  ]),
  previousNames: sf([
    r.required.bind({
      errorMsg: 'your-name:field.previousNames.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'your-name:field.previousNames.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).hasPreviousNames === 'yes'
  )),
});

module.exports = fieldValidators;
