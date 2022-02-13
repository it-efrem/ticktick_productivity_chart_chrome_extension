export const dayWidth = 18;
export const dayBorder = 2;
export const dayMilliseconds = 1000 * 60 * 60 * 24;

export const getDateFormatted = (
  milliseconds: number,
  withTime: boolean = false
) => {
  const date = new Date(milliseconds);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}${withTime ? " 00:00:00" : ""}`;
};
