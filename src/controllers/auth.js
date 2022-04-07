const getHashedPassword = require('../utils/getHashedPassword');
const user = require('../models/user');

const index = (req, res) => {
  res.render('login', {
    title: 'Rustam',
    description: 'Authentication',
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);
  const u = await user.getItem(email);

  if (u?.password === hashedPassword) {
    req.session.user = u;

    return res.redirect('wishes');
  }

  return res.render('login', {
    title: 'Rustam',
    description: 'Authentication',
    error: 'Wrong email or password. Try again.',
  });
};

const signout = async (req, res) => {
  req.session.destroy();
  res.redirect('wishes');
};

module.exports = { index, signin, signout };
