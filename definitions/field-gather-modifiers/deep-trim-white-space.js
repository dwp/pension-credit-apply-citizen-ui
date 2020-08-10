/**
 * Recursively removes leading and tailing white space from a value if string
 * or the string values nested within an array or object.
 *
 * @param  {mixed} fieldValue Value to mung
 * @return {mixed} munged value
 */
const deepTrimWhitespace = (fieldValue) => {
  if (typeof fieldValue === 'string') {
    return fieldValue.trim();
  }

  if (typeof fieldValue !== 'object' || fieldValue === null) {
    return fieldValue;
  }

  if (Array.isArray(fieldValue)) {
    return fieldValue.map(deepTrimWhitespace);
  }

  const copy = Object.create(null);
  const keys = Object.keys(fieldValue);

  for (let i = 0; i < keys.length; i++) {
    copy[keys[i]] = deepTrimWhitespace(fieldValue[keys[i]]);
  }

  return copy;
};

module.exports = (value) => deepTrimWhitespace(value.fieldValue);
