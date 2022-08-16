const category = require('../models/category');
const currency = require('../models/currency');
const price = require('../models/price');
const wish = require('../models/wish');

const { decimalDigits } = require('../utils/constants');

const formatter = currency =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: decimalDigits,
  });

const categoriseWishes = (categories, wishes) =>
  categories
    .map(({ id, ...rest }) => ({
      wishes: wishes
        ?.filter(({ category_id }) => category_id === id)
        .map(({ price, currency, ...rest }) => ({
          price: formatter(currency).format(price),
          ...rest,
        })),
      ...rest,
    }))
    .filter(({ wishes }) => wishes?.length > 0);

const index = async (req, res) => {
  const isAuth = Boolean(req.session?.user?.id);
  const categories = await category.getList();
  const wishes = await wish.getList(isAuth);

  res.render('wishes', {
    title: 'Rustam | Wishes',
    description: 'A little bit of my wishes',
    categories: categoriseWishes(categories, wishes),
    editable: isAuth,
  });
};

const item = async (req, res) => {
  const { id } = req.params;
  const item = req.route.path === '/add' ? {} : await wish.getItem(id);
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

const chart = async (req, res) => {
  const { id } = req.params;
  const prices = await price.getItem(id);
  console.log(prices);

  res.render('chart', {
    title: 'Rustam | Chart',
    description: 'A little bit of my wish',
  });
};

const add = async (req, res) => {
  const data = req.body;
  const priceValue = req.body.price;

  delete req.body.price;
  data.archive = data.archive === 'on';
  const item = await wish.addItem(data);

  if (item?.id) {
    await price.addItem(item.id, priceValue);
    res.redirect('/wishes');
  }
};

const update = async (req, res) => {
  const data = req.body;
  const newPrice = Number(req.body.price);

  delete req.body.price;
  data.archive = data.archive === 'on';
  const item = await wish.updateItem(req.params.id, data);
  const currentPrice = await price.getCurrent(req.params.id);

  if (item?.id && currentPrice.price !== newPrice) {
    await price.addItem(item.id, newPrice);
  }

  res.redirect('/wishes');
};

const remove = async (req, res) => {
  await price.deleteItem(req.params.id);
  await wish.deleteItem(req.params.id);

  return res.status(200).json({});
};

module.exports = { index, item, chart, add, update, remove };
