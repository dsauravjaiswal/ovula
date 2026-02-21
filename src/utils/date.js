export const addDays = (dateInput, days) => {
  const date = new Date(dateInput);
  date.setDate(date.getDate() + days);
  return date;
};

export const dayDiff = (a, b) => {
  const start = new Date(a);
  const end = new Date(b);
  const ms = end.getTime() - start.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
};

export const toISODate = (dateInput) => {
  const date = new Date(dateInput);
  return date.toISOString().split('T')[0];
};

export const formatHumanDate = (dateInput) =>
  new Date(dateInput).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
