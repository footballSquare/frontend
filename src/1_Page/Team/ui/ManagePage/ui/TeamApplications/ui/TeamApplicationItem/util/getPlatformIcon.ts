import xbox_icon from "../../../../../../../../../4_Shared/assets/svg/platform-xbox.svg";
import ps_icon from "../../../../../../../../../4_Shared/assets/svg/platform-playstation.svg";
import pc_icon from "../../../../../../../../../4_Shared/assets/svg/pc-desktop.svg";
import { platform } from "../../../../../../../../../4_Shared/constant/platform";

export const getPlatformIcon = (platformKey: number) => {
  switch (platform[platformKey]) {
    case "PC":
      return pc_icon;
    case "PS4":
      return ps_icon;
    case "XBOX":
      return xbox_icon;
    default:
      return "";
  }
};
