type ProfileDashBoardInputProps = {
  label: string;
  registerType:
    | "message"
    | "platform"
    | "match_position_idx"
    | "common_status_idx"
    | "nickname"
    | "discord_tag";
  name: string;
  isModifyMode: boolean;
  placeholder?: string;
};
