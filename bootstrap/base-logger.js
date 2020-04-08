/**
 * Base logger from which all need-specific child loggers are derived.
 */
const os = require('os');
const pino = require('pino');
const packageInfo = require('../package.json');

module.exports = (logLevel, wrapDebug = false) => {
  const baseLogger = pino({
    base: {
      pid: process.pid,
      hostname: os.hostname(),
      app: {
        name: `pensioncredit/${packageInfo.name}`,
        version: packageInfo.version,
      },
    },
    level: logLevel,
    messageKey: 'message',
    timestamp: () => `,"time":"${(new Date()).toISOString()}"`,
    formatters: {
      level(label) {
        return { level: label };
      },
    },
    serializers: {
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
    },
  });

  // `pino-debug` can only be imported once
  if (wrapDebug) {
    /* eslint-disable-next-line global-require */
    const pinoDebug = require('pino-debug');

    // ------------------------------------------------------------------- START
    // This import is here purely to fix an issue with the debug function in
    // ioredis. Remove it and you'll recieve an error on boot:
    // apply-citizen-ui/node_modules/express-session/node_modules/debug/src/debug.js:119
    //   debug.useColors = exports.useColors();
    // TypeError: exports.useColors is not a function
    // Essentially, `ioredis` must be loaded before `express-session`.
    /* eslint-disable-next-line global-require */
    require('ioredis');
    // --------------------------------------------------------------------- END

    pinoDebug(baseLogger, {
      auto: true,
      map: {
        '*fatal': 'fatal',
        '*error': 'error',
        '*warn': 'warn',
        '*info': 'info',
        '*debug': 'debug',
        '*trace': 'trace',
      },
    });
  }

  return baseLogger;
};
