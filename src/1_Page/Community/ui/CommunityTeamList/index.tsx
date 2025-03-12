import useGetCommunityTeamList from "../../../../3_Entity/Community/useGetCommunityTeamList";

const CommunityTeamList = (props: CommunityTeamListProps) => {
  const { communityIdx } = props;
  const [communityTeamList] = useGetCommunityTeamList({ communityIdx });
  return (
    <div className=" w-full">
      <h3>커뮤니티 소속 팀 목록</h3>
      <div>
        {communityTeamList.map((team) => {
          return (
            <div
              className={` flex flex-col gap-4 border-1`}
              style={{ backgroundColor: team.team_list_color }}
            >
              <h3>TEAM - {team.team_list_name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityTeamList;
