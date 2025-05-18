type PostCommentInputProps = {
  register: UseFormRegister<>;
  errors: FieldErrors<{ content: string }>;
  isCommentEdit?: boolean;
};
