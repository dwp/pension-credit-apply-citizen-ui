const healthEndpoint = require('./health.js');
const infoEndpoint = require('./info.js');
const metricsEndpoint = require('./metrics.js');

module.exports = (app, packageJson) => {
  app.get('/health', healthEndpoint);

  app.get('/info', infoEndpoint(packageJson));

  app.get('/metrics', metricsEndpoint);
};
