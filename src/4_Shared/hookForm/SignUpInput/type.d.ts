type SignUpInputProps = {
  register: UseFormRegister<{
    id: string;
    password: string;
    nickName: string;
    phone: string;
    statusMessage: string;
    discordTag: string;
    confirmPassword: string;
    platform: "pc" | "xbox" | "playstation";
    preferPosition: string;
    sms: string;
  }>;
  registerType:
    | "id"
    | "password"
    | "nickName"
    | "phone"
    | "statusMessage"
    | "discordTag"
    | "confirmPassword"
    | "platform"
    | "preferPosition"
    | "sms";
  errors: FieldErrors<{
    id: string;
    password: string;
    nickName: string;
    phone: string;
    statusMessage: string;
    discordTag: string;
    confirmPassword: string;
    platform: "pc" | "xbox" | "playstation";
    preferPosition: string;
    sms: string;
  }>;
  type: string;
  placeholder?: string;
};
