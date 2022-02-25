const category = require('../models/category');
const currency = require('../models/currency');
const wish = require('../models/wish');

const getPrice = props => ({
  ...props,
  price: Math.ceil(props.price).toLocaleString('ru', {
    style: 'currency',
    currency: props.currency,
    maximumFractionDigits: 0,
  }),
});

const getCategories = data =>
  data
    .filter(category => Array.isArray(category.wishes))
    .map(({ name, wishes }) => ({
      name,
      wishes: wishes.filter(w => !w.archive).map(getPrice),
    }));

const getNumber = value => parseInt(value, 10);

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

const update = async (req, res) => {
  const data = {
    ...req.body,
    categoryId: getNumber(req.body?.categoryId),
    currencyId: getNumber(req.body?.currencyId),
    price: getNumber(req.body?.price),
    archive: req.body?.archive === 'on',
  };
  await wish.update(req.params.id, data);

  res.redirect('/wishes');
};

module.exports = { list, item, update };
