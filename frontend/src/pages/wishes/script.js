import request from '../../utils/request';
import { getURLStatuses, filterByStatus } from '../../utils/statuses';

const settings = new URL('../../../public/settings.svg', import.meta.url);

const byCategory =
  id =>
  ({ categoryId }) =>
    categoryId === id;

const getPrice = (amount, currency) =>
  Math.ceil(amount).toLocaleString('ru', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

const getWish = ({ id, name, link, price, currency, statuses }) => `
  <li class="wish ${statuses.join(' ')}" data-wish-id=${id}>
    <button class="wish-button" type='button' data-wish-id=${id}>
      <img
        src="${settings}"
        width="14"
        height="14"
        alt="Icon Settings"
      />
    </button>
    <a
      class="link"
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

const render = ({ categories, wishes }) => {
  const html = categories
    .map(({ id, name }) => {
      const title = `<h4 class="category-title">${name}</h4>`;
      const list = wishes.filter(byCategory(id)).map(getWish).join('');

      if (list === '') {
        return null;
      }

      return `<section class="category">${title}<ul>${list}</ul></section>`;
    })
    .join('');

  document.querySelector('#root').innerHTML = html;
};

document.addEventListener('DOMContentLoaded', async () => {
  const { categories, wishes } = await request('/api/db');
  const urlStatuses = getURLStatuses(window.location.search);
  const filteredWishes = wishes.filter(filterByStatus(urlStatuses));

  render({ categories, wishes: filteredWishes });

  // filteredWishes.map(({ id }) => {
  //   const button = document.querySelector(`button[data-wish-id='${id}']`);
  //   const item = document.querySelector(`li[data-wish-id='${id}']`);

  //   button.addEventListener('click', () => item.classList.add('wish_active'));
  // });
});
