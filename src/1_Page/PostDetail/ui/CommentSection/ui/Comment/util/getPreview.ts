export const getPreview = (
  content: string,
  previewLimit = 100,
  maxLines = 4
) => {
  const lines = content.split(/\r?\n/);
  const isLong = content.length > previewLimit || lines.length > maxLines;

  if (!isLong) return { preview: content, isLong: false };

  const preview =
    lines.length > maxLines
      ? lines.slice(0, maxLines).join("\n")
      : content.slice(0, previewLimit);

  return { preview, isLong: true };
};
