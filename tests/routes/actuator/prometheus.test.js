const { expect } = require('chai');
const prometheus = require('../../../routes/actuator/prometheus.js');
const Response = require('../../helpers/fake-response.js');

const mockMetricsCient = {
  register: {
    contentType: 'test-header',
    metrics() {
      return 'test-response';
    },
  },
};

describe('actuator/metrics', () => {
  it('should set Content-Type header to metricsClient contentType', () => {
    const route = prometheus(mockMetricsCient);
    const res = new Response();
    route({}, res);
    expect(res.headers['Content-Type']).to.equal('test-header');
  });

  it('should send metrics', () => {
    const route = prometheus(mockMetricsCient);
    const res = new Response();
    route({}, res);
    expect(res.body).to.equal('test-response');
  });
});
