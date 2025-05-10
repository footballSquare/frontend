import AutoMoveAwardList from "../../../../2_Widget/AutoMoveAwardList";
import useGetTeamAwards from "../../../../3_Entity/Team/useGetTeamAwards";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";

const TeamAwards = () => {
  const teamIdx = useParamInteger("teamIdx");
  const [teamAwards] = useGetTeamAwards(teamIdx);

  if (teamAwards.length === 0) return <div className="h-[0px]"></div>;
  return (
    <div className="flex flex-col justify-center items-center w-full h-[130px]">
      <AutoMoveAwardList awards={teamAwards} />
    </div>
  );
};

export default TeamAwards;
