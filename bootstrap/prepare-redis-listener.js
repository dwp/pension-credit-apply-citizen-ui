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
    logger.error({
      stack: err.stack,
    }, 'Redis service error (%s)', err.message);
  });

  listener.on('end', () => {
    logger.error('Redis connection has ended and cannot be restablished. Exiting.');
    exitFn(1);
  });

  return listener;
};
