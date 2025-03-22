import useChampionshipTeams from "../../../../3_Entity/Championship/useChampionshipTeams";

export type TeamListProps = {
  teamIdx: number;
};
const TeamList = (props: TeamListProps) => {
  const { teamIdx } = props;
  const [teamList] = useChampionshipTeams(teamIdx);
  return (
    <section className="bg-white rounded-md shadow p-4">
      <h2 className="text-lg font-semibold mb-4">참가 팀</h2>
      <div className="space-y-2">
        {/* 예시로 매치업 리스트 */}
        {teamList.map((team) => (
          <div className="flex items-center justify-start gap-4">
            <span className="font-medium">{team.team_list_name}</span>
            <span className="text-sm" style={{ color: team.team_list_color }}>
              {team.team_list_short_name}
            </span>
            <img
              src={team.team_list_emblem}
              alt="Team Emblem"
              className="h-6 w-6"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default TeamList;
