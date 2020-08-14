const { v4: uuidv4 } = require('uuid');

const sanitise = (str) => String(str).replace(/[^a-z0-9;=/-]+/ig, ' ').substr(0, 256);

module.exports = function (baseLogger, traceRequestheaderName, sessionCookieName) {
  return (req, res, next) => {
    const traceObj = Object.create(null);

    if (req.headers[traceRequestheaderName]) {
      traceObj.request_id = sanitise(req.headers[traceRequestheaderName]);
    } else {
      traceObj.request_id = uuidv4();
    }

    if (req.cookies[sessionCookieName]) {
      traceObj.session_id = sanitise(req.cookies[sessionCookieName]);
    }

    // copy request-id to req.id for use in other middleware
    req.request_correlation_id = sanitise(traceObj.request_id);

    // append the trace object and user agent
    req.log = baseLogger.child({
      trace: traceObj,
      useragent: req.headers['user-agent'] ? sanitise(req.headers['user-agent']) : 'unknown',
    });

    next();
  };
};
