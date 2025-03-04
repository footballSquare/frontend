import useGetTeamAwards from "../../../../3_Entity/Team/useGetTeamAwards";
import AutoMoveAwardList from "../../../../2_Widget/AutoMoveAwardList";

const TeamAwards = () => {
  const [teamAwards] = useGetTeamAwards();

  return (
    <div className="flex flex-col justify-center items-center">
      <AutoMoveAwardList awards={teamAwards} />
    </div>
  );
};

export default TeamAwards;
