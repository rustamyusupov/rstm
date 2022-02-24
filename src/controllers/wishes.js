const category = require('../models/category');
const currency = require('../models/currency');
const wish = require('../models/wish');

const getPrice = ({ price, currency, ...rest }) => ({
  price: Math.ceil(price).toLocaleString('ru', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }),
  ...rest,
});

const getCategories = data =>
  data
    .filter(category => Array.isArray(category.wishes))
    .map(({ name, wishes }) => ({
      name,
      wishes: wishes.filter(w => !w.archive).map(getPrice),
    }));

const list = async (req, res) => {
  const data = await wish.list();
  const categories = Array.isArray(data) ? getCategories(data) : [];

  res.render('wishes', {
    title: 'Rustam | Wishes',
    description: 'A little bit of my wishes',
    categories,
  });
};

const item = async (req, res) => {
  const item = await wish.item(req.params.id);
  const categories = await category.list();
  const currencies = await currency.list();

  res.render('wish', {
    title: 'Rustam | Wish',
    description: 'A little bit of my wish',
    item,
    categories,
    currencies,
  });
};

module.exports = { list, item };
