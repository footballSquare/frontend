import useGetSignMemberList from "../../../../../../3_Entity/Team/useGetSignMemberList";
import { platform } from "../../../../../../4_Shared/constant/platform";
import xbox_icon from "../../../../../../4_Shared/assets/svg/platform-xbox.svg";
import ps_icon from "../../../../../../4_Shared/assets/svg/platform-playstation.svg";
import pc_icon from "../../../../../../4_Shared/assets/svg/pc-desktop.svg";
import usePostApproveMember from "../../../../../../3_Entity/Team/usePostApproveMember";
import useDeleteApproveMember from "../../../../../../3_Entity/Team/useDeleteApproveMember";
import useSlicePlayer from "./model/useSlicePlayer";

export type TeamApplicationsProps = {
  team_list_idx: number;
};
const TeamApplications = (props: TeamApplicationsProps) => {
  const { team_list_idx } = props;
  const [signMemberList] = useGetSignMemberList(1);
  const [slicedPlayerList, addToArray] = useSlicePlayer(signMemberList);

  const [postEvent] = usePostApproveMember(team_list_idx);
  const [deleteEvent] = useDeleteApproveMember(team_list_idx);

  return (
    <div className="flex-1 min-w-[300px] bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        팀 가입 신청 인원
      </h2>

      {slicedPlayerList.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          현재 가입 신청이 없습니다.
        </div>
      ) : (
        <div className="space-y-4 h-[400px] overflow-scroll">
          {slicedPlayerList.map((player) => (
            <div
              key={"approve_card_" + player.player_list_idx}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <img
                  src={player.player_list_profile_img}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-300"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {player.player_list_nickname}
                  </p>
                  <img
                    src={`${
                      platform[player.player_list_platform] === "PC"
                        ? pc_icon
                        : platform[player.player_list_platform] === "PS4"
                        ? ps_icon
                        : platform[player.player_list_platform] === "XBOX" &&
                          xbox_icon
                    }`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-300"
                  />
                  <p className="text-sm text-gray-500">
                    {platform[player.player_list_platform]}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    postEvent(player.player_list_idx);
                    addToArray(player.player_list_idx);
                  }}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">
                  수락
                </button>
                <button
                  onClick={() => {
                    deleteEvent(player.player_list_idx);
                    addToArray(player.player_list_idx);
                  }}
                  className="px-3 py-1 text-sm bg-white text-red-500 border border-red-300 rounded-md hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200">
                  거절
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamApplications;
