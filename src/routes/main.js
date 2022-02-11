module.exports = (req, res) => {
  res.render('index', {
    title: 'Rustam',
    description: 'A little bit about me',
  });
};
