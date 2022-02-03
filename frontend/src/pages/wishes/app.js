// import cx from 'classnames';

import request from '../../utils/request';

import * as styles from './styles.module.css';
import { getContent } from './utils';
import render from './render';

// const bindButtonEvents = () => {
//   const buttons = document.querySelectorAll('button[data-wish-id]');

//   buttons.forEach(button => {
//     const id = button.dataset.wishId;
//     const item = document.querySelector(`li[data-wish-id='${id}']`);

//     button.addEventListener('click', () => {
//       item.className = cx(item.className, styles.wish_active);
//     });
//   });
// };

document.addEventListener('DOMContentLoaded', async () => {
  const data = await request('/api/categories');
  const content = getContent(data);

  render(content);
  // bindButtonEvents();
});
