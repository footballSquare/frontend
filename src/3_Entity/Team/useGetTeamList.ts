import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 10;

const useGetTeamList = (page: number): [TeamListInfo[], boolean, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [teamLists, setTeamLists] = React.useState<TeamListInfo[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    const endPoint = `/team/list?page=${page}`;
    request("GET", endPoint, null, true);
  }, [page]);

  React.useEffect(() => {
    if (!loading && serverState && "member" in serverState) {
      setTeamLists((prev) => [
        ...prev,
        ...(serverState as { member: TeamListInfo[] }).member,
      ]);
      setHasMoreContent(
        (serverState as { member: TeamListInfo[] }).member.length >=
          ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [teamLists, hasMoreContent, loading];
};

export default useGetTeamList;
