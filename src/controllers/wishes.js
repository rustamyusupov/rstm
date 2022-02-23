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

const getCategories = data =>
  data
    .filter(category => Array.isArray(category.wishes))
    .map(({ name, wishes }) => ({
      name,
      wishes: wishes.filter(notHidden).map(getPrice),
    }));

const list = async (req, res) => {
  const data = await wishes.list();
  const categories = Array.isArray(data) ? getCategories(data) : [];

  res.render('wishes', {
    title: 'Rustam | Wishes',
    description: 'A little bit of my wishes',
    categories,
  });
};

const item = async (req, res) => {
  const data = await wishes.item(req.params.id);

  res.render('wish', {
    title: 'Rustam | Wish',
    description: 'A little bit of my wish',
    data,
  });
};

module.exports = { list, item };
