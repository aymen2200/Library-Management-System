export const icons = {
  plus: "M12 5v14M5 12h14",
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  return: "M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3",
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  borrow: "M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3",
};

export const today = () => new Date().toISOString().slice(0, 10);

export const calcDueDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const isOverdue = (dueDate, returnDate) => {
  if (returnDate) return false;
  return new Date(dueDate) < new Date();
};