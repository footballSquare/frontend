import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { teamMemberData } from "../../4_Shared/mock/teamInfo";
import { TeamMembers } from "./type";

const ITEMS_PER_PAGE = 10;

const useGetTeamMembers = (
  teamIdx: number,
  page: number
): [TeamMembers[], boolean, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [teamMembers, setTeamMembers] = React.useState<TeamMembers[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    request(teamMemberData);
    console.log("팀 ", teamIdx);
  }, [page]);

  React.useEffect(() => {
    if (!loading && serverState && "team_member" in serverState) {
      setTeamMembers((prev) => [
        ...prev,
        ...(serverState as { team_member: TeamMembers[] }).team_member,
      ]);
      setHasMoreContent(
        (serverState as { team_member: TeamMembers[] }).team_member.length >=
          ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [teamMembers, hasMoreContent, loading];
};

export default useGetTeamMembers;
