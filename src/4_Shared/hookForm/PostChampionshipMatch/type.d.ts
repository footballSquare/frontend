type PostChampionshipMatchProps = {
  registerType: RegisterType;
  register: UseFormRegister<FieldValues>;
  formState: {
    errors: FieldErrors<FieldValues>;
  };
};
type RegisterType = "matchDate" | "startTime" | "teamList";
