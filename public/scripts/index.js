import isTouch from './isTouchDevice.js';

document.addEventListener('DOMContentLoaded', async () => {
  const page = document.querySelector('.page');

  page.classList.add(isTouch() ? '' : 'not-touch');
});
