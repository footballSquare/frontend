import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 5;

const useGetCommunityTeamList = (
  props: UseGetCommunitySTeamListProps
): [
  CommunityTeam[],
  boolean,
  boolean,
  React.Dispatch<React.SetStateAction<CommunityTeam[]>>
] => {
  const { communityIdx, page } = props;
  const [serverState, request, loading] = useFetchData();
  const [communityTeamList, setCommunityTeamList] = React.useState<
    CommunityTeam[]
  >([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    request(
      "GET",
      `/community/${communityIdx}/participation_team?page=${page}`,
      null,
      false
    );
  }, [communityIdx, request, page]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setCommunityTeamList((prev: CommunityTeam[]) => [
        ...prev,
        ...(serverState as { participation_team: CommunityTeam[] })
          .participation_team,
      ]);
      setHasMoreContent(
        (serverState as { participation_team: CommunityTeam[] })
          .participation_team.length >= ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [communityTeamList, hasMoreContent, loading, setCommunityTeamList];
};

export default useGetCommunityTeamList;
