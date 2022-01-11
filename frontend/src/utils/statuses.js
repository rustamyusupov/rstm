const statuses = {
  a: 'archive',
  b: 'bought',
  h: 'hidden',
  p: 'presented',
  u: 'unwanted',
};

export const getURLStatuses = search => {
  const urlSearchParams = new URLSearchParams(search);
  const { s = '' } = Object.fromEntries(urlSearchParams.entries());

  return s
    .split(',')
    .filter(String)
    .map(s => statuses[s]);
};

export const filterByStatus =
  urlStatuses =>
  ({ statuses }) =>
    urlStatuses.length > 0
      ? urlStatuses.filter(v => statuses.includes(v)).length > 0
      : statuses.length === 0;
