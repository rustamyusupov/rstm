const statuses = {
  archive: 'archive',
  bought: 'bought',
  hidden: 'hidden',
  presented: 'presented',
  unwanted: 'unwanted',
};
const hiddenStatuses = [statuses.archive, statuses.hidden];

const getPrice = ({ price, currency, ...rest }) => ({
  price: Math.ceil(price).toLocaleString('ru', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }),
  ...rest,
});

const notHidden = ({ statuses: s }) =>
  hiddenStatuses.filter(v => s.includes(v)).length === 0;

export const getContent = data => {
  const content = data.map(({ name, wishes }) => ({
    name,
    wishes: wishes.filter(notHidden).map(getPrice),
  }));

  return content;
};
