import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockChampionshipList } from "../../4_Shared/mock/championshipList";
import { Championship } from "./types/response";
import { useGetChampionshipListProps } from "./types/request";

const useGetChampionshipList = (
  props: useGetChampionshipListProps
): [Championship[], boolean] => {
  const { communityIdx } = props;
  const [serverState, request, loading] = useFetch();
  const [championshipList, setChampionshipList] = React.useState<
    Championship[]
  >(mockChampionshipList.championship);

  React.useEffect(() => {
    request(mockChampionshipList);
  }, [communityIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setChampionshipList(
        (serverState as { championship: Championship[] }).championship
      );
    }
  }, [loading, serverState]);

  return [championshipList, loading];
};

export default useGetChampionshipList;
