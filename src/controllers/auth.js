const login = (req, res) => {
  res.render('login', {
    title: 'Rustam',
    description: 'Authentication',
  });
};

const signin = (req, res) => {
  console.log(req.body);

  res.send({});
  // res.redirect('/wishes');
};

module.exports = { login, signin };
