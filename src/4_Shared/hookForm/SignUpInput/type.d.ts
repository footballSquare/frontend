type SignUpInputProps = {
  register: UseFormRegister<{
    id: string;
    password: string;
    nickName: string;
    phone: string;
    statusMessage: string;
    discordTag: string;
    confirmPassword: string;
  }>;
  registerType:
    | "id"
    | "password"
    | "nickName"
    | "phone"
    | "statusMessage"
    | "discordTag"
    | "confirmPassword";
  errors: FieldErrors<{
    id: string;
    password: string;
    nickName: string;
    phone: string;
    statusMessage: string;
    discordTag: string;
    confirmPassword: string;
  }>;
  type: string;
  placeholder?: string;
};
