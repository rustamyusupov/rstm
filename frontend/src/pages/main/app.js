import '../../styles/global.module.css';

import * as styles from './styles.module.css';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.main');

  if (container) {
    container.className = styles.main;
  }
});
