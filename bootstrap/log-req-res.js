const filterLogHeaders = require('../utils/filter-log-headers.js');

module.exports = (req, res, next) => {
  const ns = 'http';
  let filteredHeaders;

  try {
    filteredHeaders = filterLogHeaders(req.headers);
  } catch (e) {
    filteredHeaders = {};
    req.log.error(e);
  }

  // This will use pino's mapHttpRequest and mapHttpResponse serializers
  // see: https://github.com/pinojs/pino-std-serializers#exportsmaphttprequestrequest
  req.log.info({
    req: {
      method: req.method,
      url: req.originalUrl,
      headers: filteredHeaders,
    },
    ns,
  }, 'request');
  res.on('finish', () => {
    req.log.info({
      req: {
        method: req.method,
        url: req.originalUrl,
      },
      res,
      ns,
      responseTime: parseInt(`${process.hrtime.bigint() - req.startTime}`, 10) * 0.000001,
    }, 'response');
  });
  next();
};
