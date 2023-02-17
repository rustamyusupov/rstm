const category = require('../models/category');
const currency = require('../models/currency');
const price = require('../models/price');
const wish = require('../models/wish');

const { decimalDigits } = require('../utils/constants');

const layout = {
  margin: { t: 0, l: 40 },
  showlegend: false,
};

const config = {
  responsive: true,
  staticPlot: true,
};

const trace = {
  line: { width: 2 },
  mode: 'lines+markers',
  type: 'scatter',
};

const formatter = currency =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: decimalDigits,
  });

const getDiff = (id, prices) => {
  const [last, penultimate] = prices
    .filter(({ wish_id }) => wish_id === id)
    .slice(0, 2)
    .map(({ price }) => price);

  return Math.round(((last - penultimate) / penultimate) * 100, -1);
};

const categoriseWishes = (categories, wishes, prices) =>
  categories
    .map(({ id, ...rest }) => ({
      wishes: wishes
        ?.filter(({ category_id }) => category_id === id)
        .map(({ price, currency, ...rest }) => ({
          price: formatter(currency).format(price),
          diff: getDiff(rest.id, prices),
          ...rest,
        })),
      id,
      ...rest,
    }))
    .filter(({ wishes }) => wishes?.length > 0);

const getData = prices => [
  {
    ...prices.reduce(
      (acc, cur) => ({
        ...acc,
        x: [...acc.x, new Date(cur.created_at).toLocaleDateString('ru-RU')],
        y: [...acc.y, cur.price / 100],
      }),
      { x: [], y: [] }
    ),
    trace,
  },
];

const index = async (req, res) => {
  const isAuth = Boolean(req.session?.user?.id);
  const categories = await category.getList();
  const wishes = await wish.getList(isAuth);
  const prices = await price.getList();

  res.render('wishes', {
    title: 'Rustam | Wishes',
    description: 'A little bit of my wishes',
    categories: categoriseWishes(categories, wishes, prices),
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
  const { name } = await wish.getItem(id);

  res.render('chart', {
    title: 'Rustam | Chart',
    description: 'A little bit of my wish',
    name,
    data: JSON.stringify(getData(prices)),
    layout: JSON.stringify(layout),
    config: JSON.stringify(config),
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

const sort = async (req, res) => {
  const { id, after, category } = req.body;
  const item = await wish.getItem(id);
  const afterItem = after ? await wish.getItem(after) : null;

  if (item.category_id !== Number(category)) {
    await wish.updateItem(id, { category_id: category });
  }

  await wish.sortItems(category, id, afterItem?.sort);

  return res.status(200).json({});
};

const remove = async (req, res) => {
  await price.deleteItem(req.params.id);
  await wish.deleteItem(req.params.id);

  return res.status(200).json({});
};

module.exports = { index, item, chart, add, update, sort, remove };
