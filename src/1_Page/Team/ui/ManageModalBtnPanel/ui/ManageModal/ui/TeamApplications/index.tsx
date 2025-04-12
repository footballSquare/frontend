import TeamApplicationItem from "./ui/TeamApplicationItem";
import useManagePlayers from "./model/useManagePlayers";
import useGetSignMemberList from "../../../../../../../../3_Entity/Team/useGetSignMemberList";

const TeamApplications = (props: TeamApplicationsProps) => {
  const { team_list_idx } = props;
  const [signMemberList] = useGetSignMemberList(team_list_idx);
  const [disPlayPlayer, addDisplayPlayer] = useManagePlayers(signMemberList);

  return (
    <div className="flex-1 min-w-[300px] bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        팀 가입 신청 인원
      </h2>

      {disPlayPlayer.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          현재 가입 신청이 없습니다.
        </div>
      ) : (
        <div className="space-y-4 h-[400px] overflow-scroll">
          {disPlayPlayer.map((player) => (
            <TeamApplicationItem
              key={`approve_card_${player.player_list_idx}`}
              player={player}
              addDisplayPlayer={addDisplayPlayer}
              team_list_idx={team_list_idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamApplications;
