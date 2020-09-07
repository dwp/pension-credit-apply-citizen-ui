module.exports = (app, mountUrl, waypoints, sessionTtl, timeoutDialogCountdown) => {
  app.use(mountUrl, (req, res, next) => {
    const { pathname, search } = new URL(String(req.originalUrl), 'http://dummy.test/');

    res.locals.timeoutDialog = {
      keepAliveUrl: `${mountUrl}${waypoints.SESSION_KEEP_ALIVE}`,
      signOutUrl: `${mountUrl}${waypoints.SESSION_ENDED}`,
      timeoutUrl: `${pathname}${search}`,
      countdown: sessionTtl - timeoutDialogCountdown,
      timeout: sessionTtl,
    };

    next();
  });
};
