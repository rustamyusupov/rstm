const wish = require('../models/wish');
const category = require('../models/category');
const currency = require('../models/currency');

const index = async (req, res) => {
  const isAuth = Boolean(req.session?.user?.id); // ?
  const categories = await wish.getList(isAuth);

  res.render('wishes', {
    title: 'Rustam | Wishes',
    description: 'A little bit of my wishes',
    categories,
    editable: isAuth,
  });
};

const item = async (req, res) => {
  const item = await wish.getItem(req.params.id);
  const categories = await category.getList();
  const currencies = await currency.getList();

  res.render('wish', {
    title: 'Rustam | Wish',
    description: 'A little bit of my wish',
    item,
    categories,
    currencies,
  });
};

const update = async (req, res) => {
  const item = await wish.updateItem(req.params.id, req.body);

  if (item?.id) {
    res.redirect('/wishes');
  }
};

const add = async (req, res) => {
  const item = await wish.addItem(req.body);

  if (item?.id) {
    res.redirect('/wishes');
  }
};

const remove = async (req, res) => {
  await wish.deleteItem(req.params.id);

  return res.status(200).json({});
};

module.exports = { index, item, update, add, remove };
