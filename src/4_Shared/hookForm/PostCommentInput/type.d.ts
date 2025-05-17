type PostCommentInputProps = {
  register: UseFormRegister<>;
  errors: FieldErrors<{
    title: string;
    content: string;
  }>;
};
