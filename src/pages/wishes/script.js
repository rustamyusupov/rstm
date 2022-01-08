import request from '/src/utils/request';

const archive = new URL('../../../public/archive.svg', import.meta.url);
const hidden = new URL('../../../public/hidden.svg', import.meta.url);

const visibilityMap = {
  a: 'archive',
  h: 'hidden',
};
const images = {
  archive,
  hidden,
};

const byCategory =
  id =>
  ({ categoryId }) =>
    categoryId === id;
const byVisibility =
  status =>
  ({ visibility }) =>
    visibility ? status.includes(visibility) : true;

const getIcon = name =>
  name
    ? `<img
      class="wish-icon"
      src="${images[name]}"
      width="14"
      height="14"
      alt="visibility"
      title=${name}
    />`
    : '';

const getPrice = (amount, currency) =>
  Math.ceil(amount).toLocaleString('ru', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

const getWish = ({
  name,
  link,
  price,
  currency,
  status,
  visibility,
}) => `<li class="wish">
    ${getIcon(visibility)}
    <a
      class="${status}"
      href="${link}"
      target="_blank"
      rel="nofollow noopener"
    >
      ${name}
    </a>
    &nbsp;&mdash;
    <span>${getPrice(price, currency)}</span>
  </li>`;

const render = ({ lists, visibility }) => {
  const { categories, wishes } = lists;
  const html = categories
    .map(({ id, name }) => {
      const title = `<h4 class="category-title">${name}</h4>`;
      const list = wishes
        .filter(byCategory(id))
        .filter(byVisibility(visibility))
        .map(getWish)
        .join('');

      return `<section class="category">${title}<ul>${list}</ul></section>`;
    })
    .join('');

  document.querySelector('#root').innerHTML = html;
};

const getQuery = search => {
  const urlSearchParams = new URLSearchParams(search);

  return Object.fromEntries(urlSearchParams.entries());
};

document.addEventListener('DOMContentLoaded', async () => {
  const lists = await request('/api/db');

  const { v = '' } = getQuery(window.location.search);
  const visibility = v.split(',').map(k => visibilityMap[k]);
  render({ lists, visibility });
});
