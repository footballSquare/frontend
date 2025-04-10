export const imgConverter = (selectedFile: File) => {
  if (selectedFile instanceof File) {
    return URL.createObjectURL(selectedFile);
  }
  return null;
};
