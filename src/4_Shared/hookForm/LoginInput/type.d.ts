type LoginInputProps = {
  register: UseFormRegister<>;
  registerType: "id" | "password";
  errors: FieldErrors<{
    id: string;
    password: string;
  }>;
  type: string;
  placeholder?: string;
};
