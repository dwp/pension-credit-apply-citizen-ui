const { EventEmitter } = require('events');

/**
 * Create an event listener.
 *
 * @param {Logger} logger Logger
 * @param {function} exitFn Exit function (will be passed an exit code)
 * @return {EventEmitter} Listener
 */
module.exports = (logger, exitFn) => {
  const listener = new EventEmitter();

  listener.on('ready', () => {
    logger.info('Redis service is ready');
  });

  listener.on('error', (err) => {
    // ECONNREFUSED will get thrown intermittently when connectivity is
    // temporarily lost, and also in the lead up to a connection closing.
    if (err.code === 'ECONNREFUSED') {
      logger.info({
        stack: err.stack,
      }, 'Redis connection lost (%s)', err.message);
    } else {
      logger.error({
        stack: err.stack,
      }, 'Redis service error (%s)', err.message);
    }
  });

  listener.on('end', () => {
    logger.fatal('Redis connection has ended and cannot be restablished. Exiting.');
    // Note: process.nextTick() does not work here; it causes the app to exit
    // before the logger has chance to write to stdout
    setTimeout(() => exitFn(1), 0);
  });

  return listener;
};
