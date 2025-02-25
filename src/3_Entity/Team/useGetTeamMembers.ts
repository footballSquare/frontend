import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { teamMemberData } from "../../4_Shared/mock/teamInfo";
import { TeamMembers } from "./type";

const useGetTeamMembers = (): [TeamMembers[], boolean] => {
  const [serverState, request, loading] = useFetch();
  const [teamMembers, setTeamMembers] = React.useState<TeamMembers[]>([]);

  React.useEffect(() => {
    request(teamMemberData);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "team_member" in serverState) {
      setTeamMembers(
        (serverState as { team_member: TeamMembers[] }).team_member
      );
    }
  }, [loading, serverState]);

  return [teamMembers, loading];
};

export default useGetTeamMembers;
