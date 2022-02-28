const crypto = require('crypto');

const users = require('../users.json');

const getHashedPassword = password => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');

  return hash;
};

const login = (req, res) => {
  res.render('login', {
    title: 'Rustam',
    description: 'Authentication',
  });
};

const signin = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  req.session.userId = '';

  const user = users.find(
    u => u.username === username && u.password === hashedPassword
  );

  if (user) {
    req.session.userId = user.id;
    console.log(req.session.userId, user.id);
    res.redirect('/wishes');

    return;
  }

  res.render('login', {
    title: 'Rustam',
    description: 'Authentication',
    error: true,
  });
};

module.exports = { login, signin };
