const getDragAfterElement = (list, y) => {
  const wishes = [
    ...list.querySelectorAll('.wishes__item:not(.wishes__item--dragging)'),
  ];

  return wishes.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

export const initDragAndDrop = () => {
  const lists = document.querySelectorAll('.wishes__list');
  const wishes = document.querySelectorAll('.wishes__item');

  const handleDragStart = e => {
    if (!e.target.classList.contains('wishes__item')) {
      return;
    }

    e.target.classList.add('wishes__item--dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', e.target.id);
  };

  const handleDragEnd = e => {
    e.target.classList.remove('wishes__item--dragging');

    wishes.forEach(wish => {
      wish.classList.remove('wishes__item--over');
    });
  };

  const handleDragEnter = e => {
    if (
      e.dataTransfer.effectAllowed !== 'move' ||
      !e.target.classList.contains('wishes__item')
    ) {
      return;
    }

    e.target.classList.add('wishes__item--over');
  };

  const handleDragLeave = e => {
    e.target.classList.remove('wishes__item--over');
  };

  wishes.forEach(wish => {
    wish.addEventListener('dragstart', handleDragStart);
    wish.addEventListener('dragend', handleDragEnd);
    wish.addEventListener('dragenter', handleDragEnter);
    wish.addEventListener('dragleave', handleDragLeave);
  });

  const handleDragOver = list => e => {
    e.preventDefault();

    const afterElement = getDragAfterElement(list, e.clientY);
    const wish = document.querySelector('.wishes__item--dragging');

    if (!afterElement) {
      list.appendChild(wish);
    } else {
      list.insertBefore(wish, afterElement);
    }
  };

  const handleDrop = list => e => {
    e.stopPropagation();
    const wish = e.dataTransfer.getData('text');
    const afterElement = getDragAfterElement(list, e.clientY);

    fetch(location.pathname, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({
        wish,
        after: afterElement?.id,
        category: list?.id,
      }),
    });
  };

  lists.forEach(list => {
    list.addEventListener('dragover', handleDragOver(list));
    list.addEventListener('drop', handleDrop(list));
  });
};
