# Pension Citizen Claim UI

## Support

This service is maintained by the [DWP Engineering Practice](mailto:open-source@engineering.digital.dwp.gov.uk).

## Contributing

If you'd like to contribute any changes, enhancements or report issues, please take a look at our [contribution guide](CONTRIBUTING.md).

## Getting started

> **IMPORTANT:**<br/>
> <br/>
> Some of the dependencies are ony available on the DWP's internal npm registry. Please consult the Engineering documentation to ensure your machine is configured to pull packages from that registry.

Setup:

```bash
# Install dependencies
npm ci

# Create a /static folder in the projects root directory in which all runtime
# generated assets will be stored
mkdir static

# Test (and coverage)
npm test
npm run quality

# Compliance (linting)
npm run compliance

# Security (package auditing and outdated dependencies)
npm run security

# Run all of the above in one convenient method
npm run pipeline

# Integration tests (requires Docker)
# Requires access to an ECR host housing dependent images
# Requires npm modules to be pulled from DWP internal registry
export RBAC_ECR_HOST=<account-id>.dkr.ecr.eu-west-2.amazonaws.com
export NPM_REGISTRY_URL=$(npm get registry)
npm run test:integration
```

Start the service locally on your machine, using a pre-bundled configuration (in `.env.example`):

```bash
env $(cat .env.example | grep -v '#') npm start
```

This will start the service using a pre-bundled configuration. Whilst you can use the service in this state, certain features such as postcode-lookup, and PDF generation will not be available. See the **`docker-local`** project to make these features available.

As well as passing a configuration file, you can also pass configuration options as environment variables. For example:

```bash
# You can specify a config file like this ...
npm start -- --config=.env.example

# Or this ...
# This is useful if you want the `process.env` object to inherit the config
env $(cat .env.example | grep -v '#') npm start

# Or you can pass environment variables in, like this ...
VAR1=x VAR2=y npm start

# Or a combo of both ...
PORT=1234 npm start -- --config=.env.example
```

To see messages from `debug` module, the `DEBUG=` variable _must_ be passed as an environment variable (it won't be read from a file), as well as the `LOG_LEVEL` setting, eg:

```bash
DEBUG=* LOG_LEVEL=debug npm start
```

Packaging docker image:

```bash
docker build -t apply-citizen-ui --build-arg NPM_REGISTRY_URL=$(npm get registry) -f docker/Dockerfile .
```

Running the image:

```bash
# Run in interactive mode
docker run --rm -it -p 3000:3000 \
  --env-file=.env.example \
  apply-citizen-ui
```

## Redis

All events triggered by the `ioredis` library will be available to your own listeners, i.e. https://github.com/luin/ioredis#events

Depending on the `REDIS_ENCRYPTION_MODE` setting, data will be encrypted prior to being stored in Redis. If you want to use `kms` mode for encryption, you'll need to spin up `docker-local`.

When switching between encryption modes, you may come cross errors like this:

```
error:0606506D:digital envelope routines:EVP_DecryptFinal_ex:wrong final block length
```

This is expected as the encrypted payload will only be readable by the same mode that generated it. The solution is to either refresh the page, or restart the Redis service to clear any previous sessions out.

## Logging

We're using [pino]() for all logging needs. This echos JSON logs to `stdout`, in a format that matches our defined logging structure (see our **Tech Guides** documentation).

When writing a log message, you can add additional top-level attributes to the log object by specifying them as the first argument in the log call (see [`mergingObject`](https://github.com/pinojs/pino/blob/master/docs/api.md#mergingobject-object)). For example:

```javascript
// To log an error message and its stack in the `stack` attribute
log.error({
  stack: err.stack
}, err.message)
```

### Per-request logging

Every Express route handler, or piece of middleware will have access to an instance of the [pino](https://github.com/pinojs/pino) logging utility on `req.log`, e.g. `req.log.error('Error mesasge')`. These will include trace IDs for the current request and user session.

## Redirects

Some sections of the service call `redirect()` within page hooks, which could mean that a call to `traverse()` may not reflect the actual journey of the user. For example: `address.js` - to avoid a user starting a journey when it's dependent on the completion of another journey.

## Service Information

### `GET /actuator/health`

```bash
# Request§
curl -G http://localhost:${port}/actuator/health

# Response (200)
# Content-Type: application/json
{"status": "UP"}
```

### `GET /actuator/info`

```bash
# Request§
curl -G http://localhost:${port}/actuator/info

# Response (200)
# Content-Type: application/json
{"app":{"name":"apply-citizen-ui","description":"Citizen UI to apply for Pension Credit","version":"1.0.1","node":{"version":"10.13.0"}}}
```

### `GET /actuator/metrics`

```bash
# Request§
curl -G http://localhost:${port}/actuator/metrics

# Response (200)
# Content-Type: application/json
{"uptime": 136.088}
# uptime is given in seconds
```
