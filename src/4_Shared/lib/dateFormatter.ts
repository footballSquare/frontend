export const toFormattedDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
export const toFormattedTime = (date: Date): string => {
  return date.toISOString().split("T")[1].slice(0, 5);
};
