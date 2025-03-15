import { TeamApplicationsProps } from "./type";

import useSlicePlayer from "./model/useSlicePlayer";

import useGetSignMemberList from "../../../../../../3_Entity/Team/useGetSignMemberList";
import usePostApproveMember from "../../../../../../3_Entity/Team/usePostApproveMember";
import useDeleteApproveMember from "../../../../../../3_Entity/Team/useDeleteApproveMember";

import TeamApplicationItem from "./ui/TeamApplicationItem";

const TeamApplications = (props: TeamApplicationsProps) => {
  const { team_list_idx } = props;
  const [signMemberList] = useGetSignMemberList(team_list_idx);
  const [slicedPlayerList, addToArray] = useSlicePlayer(signMemberList);

  const [postApproveMember] = usePostApproveMember(team_list_idx);
  const [deleteApproveMember] = useDeleteApproveMember(team_list_idx);

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
            <TeamApplicationItem
              key={`approve_card_${player.player_list_idx}`}
              player={player}
              postApproveMember={postApproveMember}
              deleteApproveMember={deleteApproveMember}
              addToArray={addToArray}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamApplications;
