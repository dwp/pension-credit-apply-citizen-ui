module.exports = (app, proxyUrl, waypoints, sessionTtl, timeoutDialogCountdown) => {
  app.use(proxyUrl, (req, res, next) => {
    const { pathname, search } = new URL(String(req.url), 'http://dummy.test/');
    const { mountUrl } = res.locals.casa;

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
