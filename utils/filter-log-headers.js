const headerWhitelist = [
  'x-forwarded-proto',
  'x-forwarded-port',
  'x-amzn-trace-id',
  'x-forwarded-host',
  'upgrade-insecure-requests',
  'sec-fetch-user',
  'host',
  'connection',
  'sec-fetch-mode',
  'if-none-match',
  'if-modified-since',
  'sec-fetch-site',
  'referer',
];

const sanitise = (str) => String(str).replace(/[^a-z0-9;=._%/: ?()-]/ig, '.').substr(0, 256);

// filter the req.headers to only include the whitelist keys
// get the req.headers object and build a new one based off the whitelist
module.exports = (headers) => {
  if (Object.prototype.toString.call(headers) !== '[object Object]') {
    throw new TypeError('headers must be of type [object Object]');
  }

  return Object.keys(headers)
    .filter((key) => headerWhitelist.includes(key))
    .reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = sanitise(headers[key]);
      return newObj;
    }, Object.create(null));
};
