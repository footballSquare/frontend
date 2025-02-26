export const toFormattedDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};
export const toFomattedTime = (date: Date) => {
  return date.toISOString().split("T")[1].split(".")[0];
};
