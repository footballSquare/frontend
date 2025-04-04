import xbox_icon from "../assets/svg/platform-xbox.svg";
import ps_icon from "../assets/svg/platform-playstation.svg";
import pc_icon from "../assets/svg/pc-desktop.svg";
import { platform } from "../constant/platform";

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
