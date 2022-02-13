// const model = require('../models/wishes');

module.exports = async (req, res) => {
  // const data = await model();

  res.render('wishes', {
    title: 'Rustam | Wishes',
    description: 'A little bit of my wishes',
  });
};
