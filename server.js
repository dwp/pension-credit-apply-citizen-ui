/**
 * Application entry point.
 */
const https = require('https');

// Ingest config from host environment
const CONFIG = require('./bootstrap/ingest-config.js');

// Create a base logger
// NOTE: This _must_ be initialized before anything else, as per:
// https://github.com/pinojs/pino-debug#programmatic
// Failing to do so will throw errors when CASA tries to use `debug()`.
const baseLogger = require('./bootstrap/base-logger.js')(CONFIG.LOG_LEVEL, true);

// Create an application instance
const application = require('./app.js');

const { app } = application(CONFIG, baseLogger);

// Configure HTTPS (if TLS is enabled)
let httpsServer;
if (CONFIG.USE_TLS) {
  httpsServer = https.createServer({
    key: CONFIG.TLS_KEY,
    cert: CONFIG.TLS_CERT,
  }, app);
}

// Start server
const server = (CONFIG.USE_TLS ? httpsServer : app).listen(CONFIG.PORT, () => {
  const { address, port } = server.address();
  baseLogger.info(
    'App listening at %s://%s:%s',
    CONFIG.USE_TLS ? 'https' : 'http',
    address,
    port,
  );
});
