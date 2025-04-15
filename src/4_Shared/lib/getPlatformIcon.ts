import xbox_icon from "../assets/svg/platform-xbox.svg";
import ps_icon from "../assets/svg/platform-playstation.svg";
import pc_icon from "../assets/svg/pc-desktop.svg";

export const getPlatformIcon = (platformString: Platform) => {
  switch (platformString) {
    case "pc":
      return pc_icon;
    case "playstation":
      return ps_icon;
    case "xbox":
      return xbox_icon;
    default:
      return "";
  }
};
