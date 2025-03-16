import useGetCommunityTeamList from "../../../../3_Entity/Community/useGetCommunityTeamList";

const CommunityTeamList = (props: CommunityTeamListProps) => {
  const { communityIdx } = props;
  const [communityTeamList] = useGetCommunityTeamList({ communityIdx });
  return (
    <div className="bg-white rounded-lg shadow w-full flex flex-col gap-4 overflow-y-auto">
      {communityTeamList.map((team) => {
        return (
          <div
            className={` border border-gray shadow-lg rounded-lg p-2`}
            style={{ backgroundColor: team.team_list_color }}
          >
            <h3>TEAM - {team.team_list_name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityTeamList;
