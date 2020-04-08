const { spawn } = require('child_process');

const pwd = __dirname;

const readyChecks = {
  'apply-citizen-ui': (d) => (d.match(/App listening at http/i)),
  'redis-single-server': (d) => (d.match(/Ready to accept connections/i)),
};

function attachLoggers(service) {
  service.stdout.on('data', (data) => {
    process.stdout.write(`[stdout] ${data}\n`);
  });

  service.stderr.on('data', (data) => {
    process.stderr.write(`[stderr] ${data}\n`);
  });
}

function waitForReady(serviceName, readyCheckFn, cb) {
  if (readyCheckFn === undefined) {
    cb();
    return;
  }

  const loginspect = spawn('docker-compose', ['-f', `${pwd}/services.yaml`, 'logs', '-f', serviceName]);

  const test = readyCheckFn || (() => (true));

  loginspect.stdout.on('data', (data) => {
    process.stdout.write(`[waitForReady] ${data}`);
    if (test(data.toString())) {
      loginspect.kill();
      cb();
    }
  });
}

// Useful to build once at start of tests (no cache)
function buildService(serviceName) {
  const service = spawn('docker-compose', ['-f', `${pwd}/services.yaml`, 'build', '--no-cache', '--force-rm', serviceName]);
  attachLoggers(service);

  return new Promise((resolve) => {
    service.on('exit', (code) => {
      resolve(code);
    });
  });
}

// Resolves when the service is "ready"
async function startService(serviceName, readyCheckFn) {
  const service = spawn('docker-compose', ['-f', `${pwd}/services.yaml`, 'up', '-d', '--force-recreate', '-V', '--build', serviceName]);
  attachLoggers(service);

  // If we know about the service, and no ready check function is set, default
  // to a known check test
  let readyCheckFunction;
  if (readyCheckFunction === undefined && readyChecks[serviceName]) {
    readyCheckFunction = readyChecks[serviceName];
  } else {
    readyCheckFunction = readyCheckFn;
  }

  return new Promise((resolve) => {
    // Wait for service to be created
    service.stderr.on('data', (data) => {
      if (data.toString().match(new RegExp(`Creating.+${serviceName}.+done`, 'i'))) {
        // Wait for service to be ready
        waitForReady(serviceName, readyCheckFunction, () => resolve(service));
      }
    });
  });
}

function stopService(serviceName) {
  const service = spawn('docker-compose', ['-f', `${pwd}/services.yaml`, 'rm', '-fsv', serviceName]);
  attachLoggers(service);

  return new Promise((resolve) => {
    service.on('exit', (code) => {
      resolve(code);
    });
  });
}

// Tear down all services and associated network, volumes, etc to keep it clean
function tearDownServices() {
  const service = spawn('docker-compose', ['-f', `${pwd}/services.yaml`, 'down', '-t10', '--remove-orphans', '-v', '--rmi', 'local']);
  attachLoggers(service);

  return new Promise((resolve) => {
    service.on('exit', (code) => {
      resolve(code);
    });
  });
}

module.exports = {
  buildService,
  startService,
  stopService,
  tearDownServices,
};
