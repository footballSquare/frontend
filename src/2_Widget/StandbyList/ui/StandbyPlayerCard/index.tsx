import { useNavigate } from "react-router-dom";
import { StandyPlayerCardProps } from "./type";
const StandbyPlayerCard = (props: StandyPlayerCardProps) => {
  const {
    player_list_idx,
    player_list_profile_img,
    player_prefer_position,
    player_list_nickname,
  } = props;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/profile/${player_list_idx}`);
      }}
      className=" flex flex-col"
    >
      <div className="flex items-center h-[72px] justify-between text-gray drop-shadow-md cursor-pointer bg-gray-800 rounded duration-500 px-4 py-2 text-xs hover:bg-gray-900">
        <img
          src={player_list_profile_img}
          alt="profile"
          className="w-[40px] rounded-[50%]"
        />
        <h3>{player_list_nickname}</h3>
        <h3>{player_prefer_position}</h3>
      </div>
    </div>
  );
};

export default StandbyPlayerCard;
