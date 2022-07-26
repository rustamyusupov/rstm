const cheerio = require('cheerio');

const request = require('./request');
const { currencies } = require('./constants');

const selectors = {
  'www.tradeinn.com': '#total_dinamic',
  'electronics.sony.com': 'div.custom-product-summary__price',
  'veter.cc': 'div.product-details__product-price.ec-price-item > span',
};

const fetchPrice = async ({ id, link, currency, price }) => {
  const { host } = new URL(link);
  const selector = selectors[host];

  if (!selector) {
    return {
      id,
      price: null,
    };
  }

  const response = await request(link);
  const $ = cheerio.load(response);
  const text = $(selector).text();
  const newCurrency = text.replace(/[\d.,]/g, '').trim();
  const newPrice = Number(text.replace(/[^\d.,]/g, ''));

  if (currencies[currency] !== newCurrency || Number(price) === newPrice) {
    return {
      id,
      price: null,
    };
  }

  return {
    id,
    price: newPrice,
  };
};

module.exports = fetchPrice;
