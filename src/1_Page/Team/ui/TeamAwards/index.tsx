import AutoMoveAwardList from "../../../../2_Widget/AutoMoveAwardList";
import useGetTeamAwards from "../../../../3_Entity/Team/useGetTeamAwards";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";

const TeamAwards = () => {
  const teamIdx = useParamInteger("team_list_idx");
  const [teamAwards] = useGetTeamAwards(teamIdx);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[130px]">
      <AutoMoveAwardList awards={teamAwards} />
    </div>
  );
};

export default TeamAwards;
