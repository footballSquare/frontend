import useChampionshipTeams from "../../../../3_Entity/Championship/useChampionshipTeams";

export type TeamListProps = {
  teamIdx: number;
};
const TeamList = (props: TeamListProps) => {
  const { teamIdx } = props;
  const [teamList] = useChampionshipTeams(teamIdx);
  return (
    <section className="bg-white rounded-md shadow p-4">
      <h2 className="text-lg font-semibold mb-4">현재 경기 정보</h2>
      <div className="space-y-2">
        {/* 예시로 매치업 리스트 */}
        {teamList.map((value) => (
          <div className="flex items-center justify-between">
            <span className="font-medium">@playerA</span>
            <span className="text-sm text-gray-500">vs</span>
            <span className="font-medium">@playerB</span>
          </div>
        ))}
      </div>
    </section>
  );
};
export default TeamList;
