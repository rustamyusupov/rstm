const wishes = require('../models/wishes');

const statuses = {
  archive: 'archive',
  bought: 'bought',
  hidden: 'hidden',
  presented: 'presented',
  unwanted: 'unwanted',
};
const hiddenStatuses = [statuses.archive, statuses.hidden];

const getPrice = ({ price, currency, ...rest }) => ({
  price: Math.ceil(price).toLocaleString('ru', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }),
  ...rest,
});

const notHidden = ({ statuses: s }) =>
  hiddenStatuses.filter(v => s.includes(v)).length === 0;

const getCategories = data => {
  const categories = data.map(({ name, wishes }) => ({
    name,
    wishes: wishes.filter(notHidden).map(getPrice),
  }));

  return categories;
};

const list = async (req, res) => {
  const data = await wishes.list();
  const categories = data && data.length ? getCategories(data) : [];

  res.render('wishes', {
    title: 'Rustam | Wishes',
    description: 'A little bit of my wishes',
    categories,
  });
};

module.exports = { list };
