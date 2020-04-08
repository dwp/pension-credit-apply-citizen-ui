const headerWhitelist = [
  'x-forwarded-for',
  'x-forwarded-proto',
  'x-forwarded-port',
  'x-amzn-trace-id',
  'x-forwarded-host',
  'x-real-ip',
  'cache-control',
  'upgrade-insecure-requests',
  'sec-fetch-user',
  'host',
  'connection',
  'sec-fetch-mode',
  'if-none-match',
  'if-modified-since',
  'sec-fetch-site',
  'referer',
  'authorization',
  'tokenpayload'];

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
      newObj[key] = headers[key];
      return newObj;
    }, Object.create(null));
};
