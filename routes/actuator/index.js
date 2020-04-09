const express = require('express');
const responseTime = require('response-time');
const healthEndpoint = require('./health.js');
const infoEndpoint = require('./info.js');
const metricsEndpoint = require('./metrics.js');
const prometheusEndpoint = require('./prometheus.js');

module.exports = (packageJson, { client, requestCount, requestDuration }) => {
  const router = express.Router();

  // Set up response time and prometheus reporting
  router.use(responseTime((req, res, time) => {
    res.once('finish', () => {
      const { path: route, method } = req;
      const { statusCode: status } = res;

      requestCount.inc({ route, method, status });
      requestDuration.labels(route, method, status).observe(time / 1000);
    });
  }));

  router.get('/actuator/health', healthEndpoint);
  router.get('/actuator/info', infoEndpoint(packageJson));
  router.get('/actuator/metrics', metricsEndpoint);
  router.get('/actuator/prometheus', prometheusEndpoint(client));

  return router;
};
