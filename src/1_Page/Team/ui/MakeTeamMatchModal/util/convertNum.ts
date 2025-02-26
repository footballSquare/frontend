export const convertToNumber = (data: any, fields: string[]) => {
  const result = { ...data };

  fields.forEach((field) => {
    result[field] = Number(data[field]);
  });

  return result;
};
