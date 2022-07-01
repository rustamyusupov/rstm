const { decimalDigits } = require('../utils/constants');

const formatter = currency =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: decimalDigits,
  });

module.exports = { formatter };
