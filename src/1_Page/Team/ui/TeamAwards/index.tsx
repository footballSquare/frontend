import { TeamAwardsProps } from "./type";

import AutoMoveAwardList from "../../../../2_Widget/AutoMoveAwardList";
import useGetTeamAwards from "../../../../3_Entity/Team/useGetTeamAwards";

const TeamAwards = (props: TeamAwardsProps) => {
  const { teamIdx } = props;
  const [teamAwards] = useGetTeamAwards(teamIdx);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[130px]">
      <AutoMoveAwardList awards={teamAwards} />
    </div>
  );
};

export default TeamAwards;
