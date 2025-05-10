import TeamApplicationItem from "./ui/TeamApplicationItem";
import useManagePlayers from "./model/useManagePlayers";
import useGetSignMemberList from "../../../../../../../../3_Entity/Team/useGetSignMemberList";

const TeamApplications = (props: TeamApplicationsProps) => {
  const { team_list_idx } = props;
  // api
  const [signMemberList] = useGetSignMemberList(team_list_idx);
  // obtimistic state
  const [pendingPlayers, excludePlayerById] = useManagePlayers(signMemberList);

  return (
    <div className="flex-1 w-full h-full  rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-6 border-b pb-3">
        팀 가입 신청 인원
      </h2>

      {pendingPlayers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          현재 가입 신청이 없습니다.
        </div>
      ) : (
        <div className="space-y-4 h-[400px] overflow-scroll">
          {pendingPlayers.map((player) => (
            <TeamApplicationItem
              key={`approve_card_${player.player_list_idx}`}
              player={player}
              excludePlayerById={excludePlayerById}
              team_list_idx={team_list_idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamApplications;
