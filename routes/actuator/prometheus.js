module.exports = (metricsClient) => (req, res) => {
  res.set('Content-Type', metricsClient.register.contentType);
  res.send(metricsClient.register.metrics());
};
