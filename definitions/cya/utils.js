const { lib: nunjucksLib } = require('nunjucks');
const formatPostcode = require('../../utils/format-postcode.js');

const rowFactory = (cyaUrl = '/') => ({
  changeHref, changeHtml, key, value, valueHtml,
}) => ({
  key: {
    text: key,
    classes: 'govuk-!-width-one-half',
  },
  value: {
    [valueHtml ? 'html' : 'text']: valueHtml || value,
  },
  actions: !changeHref ? {} : {
    items: [{
      href: encodeURI(changeHref.replace('#', `?edit&editorigin=${cyaUrl}#`)),
      html: changeHtml,
      classes: 'govuk-link--no-visited-state',
    }],
  },
});

const safeNl2br = (str) => str.split('\n').map(nunjucksLib.escape).join('<br/>');

// Optional suffix can provided to select context sensitive content.
// eg. we have varying radio content for if a user is a DelgatedAuthority or not:
// page:field.options.yesDelegatedAuthority,
// page:field.options.yesHelper,
const radioOptionValue = (t, context) => (dataKey, i18nOptionKey, suffix = '') => {
  const [waypoint, field] = dataKey.split('.');
  const option = context.data[waypoint] && context.data[waypoint][field]
    ? context.data[waypoint][field].replace(/[^a-z0-9_-]/ig, '')
    : '';

  return t(`${i18nOptionKey}.${option}${suffix}`);
};

const checkboxOptionValues = (t, context) => (dataKey, i18nOptionKey, i18nNoneKey) => {
  const [waypoint, field] = dataKey.split('.');
  const cd = context.data[waypoint];
  const options = cd && cd[field] && Array.isArray(cd[field])
    ? cd[field].map((v) => t(`${i18nOptionKey}.${v.replace(/[^a-z0-9_-]/ig, '')}`))
    : [];

  const str = options.length ? options.join('\n') : t(i18nNoneKey);

  return safeNl2br(str);
};

const formatAddress = (address) => {
  const formattedAddress = Object.values({
    ...address,
    postcode: formatPostcode(address.postcode),
  }).filter((v) => v).join('\n');

  return safeNl2br(formattedAddress);
};

module.exports = {
  rowFactory,
  radioOptionValue,
  checkboxOptionValues,
  safeNl2br,
  formatAddress,
};
