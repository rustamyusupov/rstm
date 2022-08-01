const cheerio = require('cheerio');

const category = require('../models/category');
const currency = require('../models/currency');
const price = require('../models/price');
const wish = require('../models/wish');

const request = require('../utils/request');
const { decimalDigits, currencies } = require('../utils/constants');

const selectors = {
  'www.tradeinn.com': '#total_dinamic',
  'electronics.sony.com': 'div.custom-product-summary__price',
  'veter.cc': 'div.product-details__product-price.ec-price-item > span',
};

const updatePrice = async wish => {
  const { host } = new URL(wish.link);
  const selector = selectors[host];

  if (!selector) {
    return wish;
  }

  const response = await request(wish.link);
  const $ = cheerio.load(response);
  const text = $(selector).text();
  const newCurrency = text.replace(/[\d.,]/g, '').trim();
  const newPrice = Number(text.replace(/[^\d.,]/g, ''));
  const isNew =
    currencies[wish.currency] === newCurrency &&
    Number(wish.price) !== newPrice;

  return {
    ...wish,
    price: isNew ? newPrice : wish.price,
  };
};

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
  const list = await wish.getList(isAuth);
  const wishes = await Promise.all(list.map(updatePrice));
  const updated = wishes.filter(
    ({ id, price }) =>
      Number(list.find(item => item.id === id).price) !== Number(price)
  );

  if (isAuth && updated.length !== 0) {
    await price.addItems(updated);
  }

  res.render('wishes', {
    title: 'Rustam | Wishes',
    description: 'A little bit of my wishes',
    categories: categoriseWishes(categories, wishes),
    editable: isAuth,
  });
};

const item = async (req, res) => {
  const { id } = req.params;
  const item = id === 'add' ? {} : await wish.getItem(id);
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
  const priceValue = req.body.price;

  delete req.body.price;
  data.archive = data.archive === 'on';
  const item = await wish.updateItem(req.params.id, data);

  if (item?.id) {
    await price.addItem(item.id, priceValue);
    res.redirect('/wishes');
  }
};

const remove = async (req, res) => {
  await price.deleteItem(req.params.id);
  await wish.deleteItem(req.params.id);

  return res.status(200).json({});
};

module.exports = { index, add, item, update, remove };
