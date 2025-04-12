import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 10;

const useGetRecruitTeamList = (
  page: number
): [TeamListInfo[], boolean, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [recruitteamLists, setRecruitteamLists] = React.useState<
    TeamListInfo[]
  >([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    const endPoint = `/team/list/recruiting?page=${page}`;
    request("GET", endPoint, null, true);
  }, [page]);

  React.useEffect(() => {
    if (!loading && serverState && "member" in serverState) {
      setRecruitteamLists((prev) => [
        ...prev,
        ...(serverState as { member: TeamListInfo[] }).member,
      ]);
      setHasMoreContent(
        (serverState as { member: TeamListInfo[] }).member.length >=
          ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [recruitteamLists, hasMoreContent, loading];
};

export default useGetRecruitTeamList;
