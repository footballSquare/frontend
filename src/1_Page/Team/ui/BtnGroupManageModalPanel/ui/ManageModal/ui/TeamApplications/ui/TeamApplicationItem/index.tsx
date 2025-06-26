import { getPlatformIcon } from "../../../../../../../../../../4_Shared/lib/getPlatformIcon";
import defaultProfileImage from "../../../../../../../../../../4_Shared/assets/svg/profile.svg";
import usePostApproveMemberHandler from "./model/usePostApproveMemberHandler";
import useDeleteApproveMemberHandler from "./model/useDeleteApproveMember";

const TeamApplicationItem = (props: TeamApplicationItemProps) => {
  const { player, team_list_idx, excludePlayerById, includePayerById } = props;

  const { handlePostApproveMember } = usePostApproveMemberHandler({
    team_list_idx,
    excludePlayerById,
    includePayerById,
  });
  const { handleDeleteApproveMember } = useDeleteApproveMemberHandler({
    team_list_idx,
    excludePlayerById,
    includePayerById,
  });

  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
      <div className="flex items-center space-x-4">
        <img
          src={player.player_list_profile_image || defaultProfileImage}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
        />
        <div>
          <p className="font-medium text-gray-100">
            {player.player_list_nickname}
          </p>
          <img
            src={getPlatformIcon(player.player_list_platform)}
            alt={player.player_list_platform}
            className="w-12 h-12"
          />
          <p className="text-sm text-gray-400">{player.player_list_platform}</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => {
            handlePostApproveMember(player.player_list_idx);
          }}
          className="px-3 py-1 text-sm bg-grass/50 text-white rounded-md hover:bg-grass transition-colors shadow-md">
          수락
        </button>
        <button
          onClick={() => {
            handleDeleteApproveMember(player.player_list_idx);
          }}
          className="px-3 py-1 text-sm bg-gray-700 text-red-400 border border-red-400 rounded-md hover:bg-red-900 hover:text-red-300 transition-colors shadow-md">
          거절
        </button>
      </div>
    </div>
  );
};

export default TeamApplicationItem;
