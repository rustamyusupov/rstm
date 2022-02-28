const category = require('../models/category');
const currency = require('../models/currency');
const wish = require('../models/wish');

const sort = (a, b) => b.sort - a.sort;

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
      wishes: wishes.sort(sort).map(getPrice),
    }));

const getNumber = value => parseInt(value, 10);

const getData = body => ({
  ...body,
  categoryId: getNumber(body?.categoryId),
  currencyId: getNumber(body?.currencyId),
  price: getNumber(body?.price),
  sort: getNumber(body?.sort),
  archive: body?.archive === 'on',
});

const list = async (req, res) => {
  const data = await wish.list();
  const categories = Array.isArray(data) ? getCategories(data) : [];
  const editable = Boolean(req.session.userId);

  res.render('wishes', {
    title: 'Rustam | Wishes',
    description: 'A little bit of my wishes',
    categories,
    editable,
  });
};

const item = async (req, res) => {
  const id = req.params.id;
  const item = id !== 'add' ? await wish.item(req.params.id) : {};
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

const add = async (req, res) => {
  const data = getData(req.body);
  await wish.add(data);

  res.redirect('/wishes');
};

const update = async (req, res) => {
  const data = getData(req.body);
  await wish.update(req.params.id, data);

  res.redirect('/wishes');
};

module.exports = { list, item, add, update };
