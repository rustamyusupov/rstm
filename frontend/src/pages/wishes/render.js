import cx from 'classnames';

import '../../styles/global.module.css';
import isTouchDevice from '../../utils/isTouchDevice';

import * as styles from './styles.module.css';

const settings = new URL('../../../public/settings.svg', import.meta.url);

const getClasses = ({ statuses, ...rest }) => ({
  classes: statuses.map(s => styles[s]),
  ...rest,
});

const getItem = ({ classes, id, link, name, price }) => `
  <li class="${cx(styles.wish, classes)}" data-wish-id=${id}>
    <button class=${styles.button} type='button' data-wish-id=${id}>
      <img
        src="${settings}"
        width="14"
        height="14"
        alt="Icon Settings"
      />
    </button>
    <a
      class=${styles.link}
      href="${link}"
      target="_blank"
      rel="nofollow noopener"
    >
      ${name}
    </a>
    &nbsp;&mdash;
    <span>${price}</span>
  </li>
`;

const render = content => {
  const container = document.querySelector('.wishes');

  const html = content
    .map(({ name, wishes }) => {
      const title = `<h4 class=${styles.title}>${name}</h4>`;
      const items = wishes.map(getClasses).map(getItem).join('');

      return `<section class=${styles.category}>${title}<ul>${items}</ul></section>`;
    })
    .join('');

  container.className = cx(styles.wishes, {
    [styles['not-touch']]: !isTouchDevice(),
  });
  container.innerHTML = html;
};

export default render;
