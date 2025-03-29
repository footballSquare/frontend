type LoginInputProps = {
  register: UseFormRegister<{
    id: string;
    password: string;
  }>;
  registerType: "id" | "password";
  errors: FieldErrors<{
    id: string;
    password: string;
  }>;
};
