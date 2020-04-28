const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get(
    '/getSubscription',
    mid.requiresSecure,
    controllers.Account.getSubscription,
  );
  app.get('/getManga', mid.requiresLogin, controllers.Tracker.getManga);
  app.post(
    '/addManga',
    mid.requiresLogin,
    mid.requiresSecure,
    controllers.Tracker.addManga,
  );
  app.post(
    '/deleteManga',
    mid.requiresLogin,
    mid.requiresSecure,
    controllers.Tracker.deleteManga,
  );
  app.post(
    '/subscribe',
    mid.requiresLogin,
    mid.requiresSecure,
    controllers.Account.subscribe,
  );
  app.post(
    '/updateManga',
    mid.requiresLogin,
    mid.requiresSecure,
    controllers.Tracker.updateManga,
  );
  app.get(
    '/login',
    mid.requiresSecure,
    mid.requiresLogout,
    controllers.Account.loginPage,
  );
  app.post(
    '/login',
    mid.requiresSecure,
    mid.requiresLogout,
    controllers.Account.login,
  );
  app.post(
    '/signup',
    mid.requiresSecure,
    mid.requiresLogout,
    controllers.Account.signup,
  );
  app.post('/updatePassword', controllers.Account.updatePassword);
  app.get('/reset', controllers.Account.resetPage);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/tracker', controllers.Tracker.trackerPage);
  app.get('/', controllers.Account.loginPage);
  app.get(
    '*',
    mid.requiresSecure,
    mid.requiresLogin,
    controllers.Tracker.trackerPage,
  );
};

module.exports = router;
