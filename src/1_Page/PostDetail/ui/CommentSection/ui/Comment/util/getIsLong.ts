export const getIsLong = (
  content: string,
  previewLimit = 100,
  maxLines = 4
): boolean => {
  const lines = content.split(/\r?\n/);
  return content.length > previewLimit || lines.length > maxLines;
};
