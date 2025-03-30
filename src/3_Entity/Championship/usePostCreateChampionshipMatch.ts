import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCreateChampionshipMatch = (
  championshipListIdx: number
): [
  postCreateChampionshipMatch: (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const postCreateChampionshipMatch = (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => {
    const endPoint = `/championship/${championshipListIdx}/championship_match`;
    request("POST", endPoint, championshipMatchForm, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case "403":
    }
  }, [serverState]);

  return [postCreateChampionshipMatch, serverState, loading];
};

export default usePostCreateChampionshipMatch;
