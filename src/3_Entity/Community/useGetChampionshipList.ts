import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { mockChampionshipList } from "../../4_Shared/mock/championshipList";

const ITEMS_PER_PAGE = 5;

const useGetChampionshipList = (
  props: UseGetChampionshipListProps
): [Championship[], boolean, boolean] => {
  const { communityIdx, page } = props;
  const [serverState, request, loading] = useFetchData();
  const [championshipList, setChampionshipList] = React.useState<
    Championship[]
  >(mockChampionshipList.championship);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    request(
      "GET",
      `/community/${communityIdx}/championship?page=${page}`,
      null
    );
  }, [communityIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setChampionshipList(
        (serverState as { championship: Championship[] }).championship
      );
      setHasMoreContent(
        (serverState as { championship: Championship[] }).championship.length >=
          ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [championshipList, hasMoreContent, loading];
};

export default useGetChampionshipList;
