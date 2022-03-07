const auth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }

  res.locals.user = req.session.user; // ?

  return next();
};

module.exports = auth;
