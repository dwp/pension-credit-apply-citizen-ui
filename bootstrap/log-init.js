const { v4: uuidv4 } = require('uuid');

module.exports = function (baseLogger, traceRequestheaderName, sessionCookieName) {
  return (req, res, next) => {
    const traceObj = Object.create(null);

    if (req.headers[traceRequestheaderName]) {
      traceObj.request_id = String(req.headers[traceRequestheaderName]);
    } else {
      traceObj.request_id = uuidv4();
    }

    if (req.cookies[sessionCookieName]) {
      traceObj.session_id = String(req.cookies[sessionCookieName]);
    }

    // copy request-id to req.id for use in other middleware
    req.request_correlation_id = traceObj.request_id;

    // append the trace object and user agent
    req.log = baseLogger.child({
      trace: traceObj,
      useragent: req.headers['user-agent'],
    });

    next();
  };
};
