const cheerio = require('cheerio');

const wish = require('../models/wish');
const price = require('../models/price');
const request = require('../utils/request');
const { currencies } = require('../utils/constants');

const selectors = {
  'www.tradeinn.com': '#total_dinamic',
  'electronics.sony.com': 'div.custom-product-summary__price',
  'veter.cc': 'div.product-details__product-price.ec-price-item > span',
  'www.fizik.com': 'div.product-info-price #product-price-6098 > span.price',
  'www.lecoffeeride.cc':
    '#product-12255 > div.summary.entry-summary > p > span',
};

const fetch = async wish => {
  const { host } = new URL(wish.link);
  const selector = selectors[host];

  if (!selector) {
    return null;
  }

  const response = await request(wish.link);
  const data = await response.text();
  const $ = cheerio.load(data);
  const text = $(selector).text();
  const newCurrency = text.replace(/[\d.,]/g, '').trim();
  const newPrice = Number(text.replace(/[^\d.,]/g, '').replace(',', '.'));
  const isNew =
    currencies[wish.currency] === newCurrency &&
    Number(wish.price) !== newPrice;

  if (!isNew) {
    return null;
  }

  return {
    ...wish,
    price: newPrice,
  };
};

const updatePrices = async () => {
  const list = await wish.getList();
  const wishes = await Promise.all(list.map(fetch));
  const updated = wishes.filter(Boolean);

  console.log(list, wishes, updated);

  if (updated.length !== 0) {
    await price.addItems(updated);
  }
};

module.exports = updatePrices;
