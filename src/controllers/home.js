const index = (req, res) => {
  res.render('index', {
    title: 'Rustam',
    description: 'A little bit about me',
  });
};

module.exports = { index };
