/**
 * Filter and sanitise http headers.
 */

const sanitise = (str) => String(str).replace(/[^a-z0-9;=._%/: ?()]/ig, '').substr(0, 256);

module.exports = (headers, allowlist = []) => {
  if (Object.prototype.toString.call(headers) !== '[object Object]') {
    throw new TypeError('headers must be of type [object Object]');
  }

  if (!Array.isArray(allowlist)) {
    throw new TypeError('allowlist must be an array');
  }

  return Object.keys(headers)
    .filter((key) => allowlist.includes(key))
    .reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = sanitise(headers[key]);
      return newObj;
    }, Object.create(null));
};
