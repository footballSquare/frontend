import { WaitingPlayerCardProps } from "./type";
import profileImg from "../../../../4_Shared/assets/svg/tempProfile.jpg";
import { platform } from "../../../../4_Shared/constant/platform";
import pc_icon from "../../../../4_Shared/assets/svg/pc-desktop.svg";
import ps_icon from "../../../../4_Shared/assets/svg/platform-playstation.svg";
import xbox_icon from "../../../../4_Shared/assets/svg/platform-xbox.svg";
const WaitingPlayerCard = (props: WaitingPlayerCardProps) => {
  const {
    player_list_idx,
    player_list_platform,
    player_list_profile_img,
    player_prefer_position,
    player_list_nickname,
    observeRef,
  } = props;
  return (
    <div className="bg-white">
      <div className=" flex flex-col ">
        <div
          ref={observeRef}
          className="flex items-center h-[72px] justify-between drop-shadow-md cursor-pointer bg-light-blue duration-500 px-4 py-2 text-xs hover:bg-blue hover:text-white"
        >
          <img src={profileImg} alt="profile" className="w-[40px] rounded-[50%]" />
          <h3>{player_list_nickname}</h3>
          <h3>{player_prefer_position}</h3>
          <img
            className=" w-[24px]"
            src={`${
              platform[player_list_platform] === "PC"
                ? pc_icon
                : platform[player_list_platform] === "PS4"
                ? ps_icon
                : platform[player_list_platform] === "XBOX" && xbox_icon
            }`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default WaitingPlayerCard;
