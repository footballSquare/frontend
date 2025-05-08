type PostBoardInputProps = {
  register: UseFormRegister<>;
  registerType: "title" | "content";
  errors: FieldErrors<{
    title: string;
    content: string;
  }>;
  type: string;
  placeholder?: string;
}