export const convertToFormData = (data: PostEditFormFields) => {
  const formData = new FormData();
  formData.append("board_list_title", data.board_list_title);
  formData.append("board_list_content", data.board_list_content);
  if (data.board_list_img && data.board_list_img.length > 0) {
    Array.from(data.board_list_img).forEach((file) => {
      formData.append("board_list_img", file);
    });
  }
  return formData;
};
