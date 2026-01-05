export const formatDateAndTime = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const reformatedDate = new Date(date);

  const day = pad(reformatedDate.getDate());
  const month = pad(reformatedDate.getMonth() + 1);
  const year = reformatedDate.getFullYear();
  const hours = pad(reformatedDate.getHours());
  const minutes = pad(reformatedDate.getMinutes());

  return `${day}/${month}/${year} at ${hours}:${minutes}`;
};

export const formatDate = (date: Date | null) => {
  if (date === null) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  const reformatedDate = new Date(date);

  const day = pad(reformatedDate.getDate());
  const month = pad(reformatedDate.getMonth() + 1);
  const year = reformatedDate.getFullYear();

  return `${year}-${month}-${day}`;
};

export const getPages = (n: number, maxPages: number) => {
  const start =
    n < 5 ? 1 : maxPages - 3 <= n && n <= maxPages ? maxPages - 4 : n - 1;
  const end = maxPages - 3 <= n && n <= maxPages ? maxPages : n < 5 ? 5 : n + 1;

  const pages: number[] = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};
