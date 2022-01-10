import request from '../../utils/request';

const settings = new URL('../../../public/settings.svg', import.meta.url);

const statuses = {
  a: 'archive',
  b: 'bought',
  h: 'hidden',
  p: 'presented',
  u: 'unwanted',
};

const getQuery = search => {
  const urlSearchParams = new URLSearchParams(search);

  return Object.fromEntries(urlSearchParams.entries());
};

const byCategory =
  id =>
  ({ categoryId }) =>
    categoryId === id;
const byVisibility =
  visibility =>
  ({ statuses }) =>
    visibility.length > 0
      ? visibility.filter(v => statuses.includes(v)).length > 0
      : statuses.length === 0;

const getPrice = (amount, currency) =>
  Math.ceil(amount).toLocaleString('ru', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

const getWish =
  onClick =>
  ({ name, link, price, currency, statuses }) =>
    `
  <li class="wish">
    <button class="wish-button" type='button' onClick={${onClick}}>
      <img
        src="${settings}"
        width="14"
        height="14"
        alt="visibility"
        title="settings"
      />
    </button>
    <a
      class="${statuses.join(' ') || 'active'}"
      href="${link}"
      target="_blank"
      rel="nofollow noopener"
    >
      ${name}
    </a>
    &nbsp;&mdash;
    <span>${getPrice(price, currency)}</span>
  </li>
`;

const render = ({ lists, visibility }) => {
  const { categories, wishes } = lists;
  const html = categories
    .map(({ id, name }) => {
      const title = `<h4 class="category-title">${name}</h4>`;
      const handleClick = id => () => console.log(id);
      const list = wishes
        .filter(byCategory(id))
        .filter(byVisibility(visibility))
        .map(getWish(handleClick(id)))
        .join('');

      return list !== ''
        ? `<section class="category">${title}<ul>${list}</ul></section>`
        : null;
    })
    .join('');

  document.querySelector('#root').innerHTML = html;
};

document.addEventListener('DOMContentLoaded', async () => {
  const lists = await request('/api/db');
  const { s = '' } = getQuery(window.location.search);
  const visibility = s
    .split(',')
    .filter(String)
    .map(s => statuses[s]);

  render({ lists, visibility });
});
