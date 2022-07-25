const { coinsInPrice } = require('./constants');

const getPriceInCoins = value =>
  Math.trunc(Math.round(Number(value) * coinsInPrice));

module.exports = getPriceInCoins;
