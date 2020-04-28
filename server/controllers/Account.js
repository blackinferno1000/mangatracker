const models = require('../models');

const { Account } = models;

// login page
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

// password reset page
const resetPage = (req, res) => {
  res.render('reset', { csrfToken: req.csrfToken() });
};

// logs out user
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// logs in user
const login = (req, res) => {
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(
    username,
    password,
    (err, account) => {
      if (err || !account) {
        return res.status(400).json({ error: 'Wrong username or password' });
      }

      req.session.account = Account.AccountModel.toAPI(account);

      return res.json({ redirect: '/tracker' });
    },
  );
};

// signs user up
const signup = (req, res) => {
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/tracker' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

// updates password of user
const updatePassword = (req, res) => {
  req.body.username = `${req.body.username}`;
  req.body.oldPass = `${req.body.oldPass}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (
    !req.body.username
    || !req.body.oldPass
    || !req.body.pass
    || !req.body.pass2
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.authenticate(
    req.body.username,
    req.body.oldPass,
    (err, account) => {
      if (err || !account) {
        return res.status(400).json({ error: 'Wrong username or password' });
      }

      req.session.account = Account.AccountModel.toAPI(account);

      return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
        const accountData = {
          salt,
          password: hash,
        };

        const savePromise = account.updateOne(accountData);

        savePromise.then(() => {
          req.session.account = Account.AccountModel.toAPI(account);
          return res.json({ redirect: '/tracker' });
        });

        savePromise.catch((error) => {
          console.log(error);

          // if (err.code === 11000) {
          //   return res.status(400).json({ error: 'Username already in use.' });
          // }

          return res.status(400).json({ error: 'An error occurred' });
        });
      });
    },
  );
};

// subscribes user
const subscribe = (req, res) => {
  Account.AccountModel.findByUsername(
    req.session.account.username,
    (err, account) => {
      if (err || !account) {
        return res.status(400).json({ error: 'Wrong username' });
      }
      let accountData;
      if (account.subscribed) {
        accountData = {
          subscribed: false,
        };
      } else {
        accountData = {
          subscribed: true,
        };
      }

      const savePromise = account.updateOne(accountData);

      savePromise.then(() => {
        console.log('subscribed');
        // req.session.account = Account.AccountModel.toAPI(account);
        return res.json({ redirect: '/tracker' });
      });

      savePromise.catch((error) => {
        console.log(error);

        // if (err.code === 11000) {
        //   return res.status(400).json({ error: 'Username already in use.' });
        // }

        return res.status(400).json({ error: 'An error occurred' });
      });
      return false;
    },
  );
};

// gets token
const getToken = (req, res) => {
  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

// gets subscription status
const getSubscription = (req, res) => {
  let subscription;
  // console.log(req.session.account.username);
  Account.AccountModel.findByUsername(
    req.session.account.username,
    (err, account) => {
      if (err || !account) {
        return res.status(400).json({ error: 'Wrong username' });
      }
      // console.log(account["subscribed"]);
      subscription = account.subscribed;
      console.log(subscription);
      const subJSON = {
        subscribed: subscription,
      };

      return res.json(subJSON);
    },
  );
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.updatePassword = updatePassword;
module.exports.resetPage = resetPage;
module.exports.subscribe = subscribe;
module.exports.getSubscription = getSubscription;
