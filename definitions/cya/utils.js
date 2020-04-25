function row({
  changeHref, changeHtml, key, value, valueHtml,
}) {
  return {
    key: {
      text: key,
      classes: 'govuk-!-width-one-half',
    },
    value: {
      [valueHtml ? 'html' : 'text']: valueHtml || value,
    },
    actions: !changeHref ? {} : {
      items: [{
        href: changeHref.replace('#', '?edit&editorigin=/check-your-answers#'),
        html: changeHtml,
        classes: 'govuk-link--no-visited-state',
      }],
    },
  };
}

const radioOptionValue = (t, context) => (dataKey, i18nOptionKey) => {
  const [waypoint, field] = dataKey.split('.');
  const option = context.data[waypoint] && context.data[waypoint][field]
    ? context.data[waypoint][field].replace(/[^a-z0-9_-]/ig, '')
    : '';
  return t(`${i18nOptionKey}.${option}`);
};

module.exports = {
  row,
  radioOptionValue,
};
