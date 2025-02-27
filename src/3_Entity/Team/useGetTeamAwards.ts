import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { teamAwardsData } from "../../4_Shared/mock/teamInfo";
import { TeamAwards } from "./type";

const ITEMS_PER_PAGE = 5;

const useGetTeamAwards = (page: number): [TeamAwards[], boolean, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [teamAwards, setTeamAwards] = React.useState<TeamAwards[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    request(teamAwardsData);
  }, [page]);

  React.useEffect(() => {
    if (!loading && serverState && "team_award" in serverState) {
      setTeamAwards((prev) => [
        ...prev,
        ...(serverState as { team_award: TeamAwards[] }).team_award,
      ]);
      setHasMoreContent(
        (serverState as { team_award: TeamAwards[] }).team_award.length >=
          ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [teamAwards, hasMoreContent, loading];
};

export default useGetTeamAwards;
