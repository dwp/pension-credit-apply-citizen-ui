const charsToEscape = /[<>&'"]/g;

const escapeChar = (char) => {
  switch (char) {
  case '<':
    return '&lt;';
  case '>':
    return '&gt;';
  case '&':
    return '&amp;';
  case '\'':
    return '&#39;';
  case '"':
    return '&quot;';
  default:
    return char;
  }
};

const escapeHtml = (html = '') => {
  if (typeof html !== 'string') {
    throw new TypeError(`Expected string got ${typeof html}: ${html}`);
  }

  return html.replace(charsToEscape, escapeChar);
};

module.exports = escapeHtml;
