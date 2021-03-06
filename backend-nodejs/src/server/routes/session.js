const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth_helpers');
const passport = require('../auth/local');

router.post('', authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { handleResponse(res, 500, 'error'); }
    if (!user) { handleResponse(res, 404, 'User not found'); }
    if (user) {
      req.logIn(user, function (error) {
        if (error) handleResponse(res, 500, 'error');
        authHelpers.pingUser(res, 200, user);
      });
    }
  })(req, res, next);
});

router.delete('', authHelpers.loginRequired, (req, res, next) => {
  const user = req.user
  req.logout();
  // the passport middleware sets req.user to null
  authHelpers.pingUser(res, 200, user || {}); // Response should respond with empty json
                                       // ...but it just responds 200 ok
  // TESTING REVEALS:
  /*
    If an empty object(data) is sent to req.status(code).json(data)
    THEN there will be no response body.

    HOWEVER if a key is added to data, then json will be set.
    SINCE logout doesn't care about response, it's okay to
    respond with empty data
  */
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
