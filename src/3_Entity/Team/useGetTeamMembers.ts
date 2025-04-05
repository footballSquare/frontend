import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 10;

const useGetTeamMembers = (
  teamIdx: number,
  page: number
): [TeamMembers[], boolean, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [teamMembers, setTeamMembers] = React.useState<TeamMembers[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    const endPoint = `/team/${teamIdx}/member?page=${page}`;
    request("GET", endPoint, null, true);
  }, [page]);

  React.useEffect(() => {
    if (!loading && serverState && "member" in serverState) {
      setTeamMembers((prev) => [
        ...prev,
        ...(serverState as { member: TeamMembers[] }).member,
      ]);
      setHasMoreContent(
        (serverState as { member: TeamMembers[] }).member.length >=
          ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [teamMembers, hasMoreContent, loading];
};

export default useGetTeamMembers;
