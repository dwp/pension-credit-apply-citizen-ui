const cookieParser = require('cookie-parser');
const startTime = require('./log-start.js');
const prepareRequestLogs = require('./log-init.js');
const generateReqResLogs = require('./log-req-res.js');


module.exports = (expressApp, baseLogger, traceRequestheaderName, sessionCookieName) => {
  // Start timing meta
  expressApp.use(startTime);

  // Look for cookies
  expressApp.use(cookieParser());

  // Prepare a logger for all requests. This will make available a `req.log.*()`
  // series of log functions (info, warn, etc).
  expressApp.use(prepareRequestLogs(baseLogger, traceRequestheaderName, sessionCookieName));

  // Log request and response details
  expressApp.use(generateReqResLogs);
};
