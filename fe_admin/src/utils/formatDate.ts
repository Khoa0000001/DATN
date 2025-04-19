// utils/formatDate.ts
export const formatDate = (isoString: string): string => {
  if (!isoString) return "";

  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
