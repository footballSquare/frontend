type PostEditInputProps = {
  register: UseFormRegister<>;
  registerType: "title" | "img" | "content";
  errors: FieldErrors<{
    title: string;
    content: string;
  }>;
  control?: Control<{
    img: string;
  }>;
};
