import useDeleteApproveMember from "../../../../../../../../../../3_Entity/Team/useDeleteApproveMember";
import usePostApproveMember from "../../../../../../../../../../3_Entity/Team/usePostApproveMember";
import { getPlatformIcon } from "../../../../../../../../../../4_Shared/lib/getPlatformIcon";

const TeamApplicationItem = (props: TeamApplicationItemProps) => {
  const { player, team_list_idx, addDisplayPlayer } = props;
  console.log(player);

  const [postApproveMember] = usePostApproveMember(team_list_idx);
  const [deleteApproveMember] = useDeleteApproveMember(team_list_idx);

  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
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
            src={getPlatformIcon(player.player_list_platform)}
            alt={player.player_list_platform}
            className="w-12 h-12"
          />
          <p className="text-sm text-gray-500">{player.player_list_platform}</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => {
            postApproveMember(player.player_list_idx);
            addDisplayPlayer(player.player_list_idx);
          }}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          수락
        </button>
        <button
          onClick={() => {
            deleteApproveMember(player.player_list_idx);
            addDisplayPlayer(player.player_list_idx);
          }}
          className="px-3 py-1 text-sm bg-white text-red-500 border border-red-300 rounded-md hover:bg-red-50 transition-colors">
          거절
        </button>
      </div>
    </div>
  );
};

export default TeamApplicationItem;
