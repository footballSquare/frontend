import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCreateChampionshipMatch = (
  championshipListIdx: number
): [
  postCreateChampionshipMatch: (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => void,
  serverState: Record<string, unknown> | null
] => {
  const [serverState, request] = useFetchData();

  const postCreateChampionshipMatch = (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => {
    const endPoint = `/championship/${championshipListIdx}/championship_match`;
    request("POST", endPoint, championshipMatchForm, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    console.log("serverState", serverState.data);
    switch (serverState.status) {
      case 200:
        break;
      case "403":
    }
  }, [serverState]);

  return [postCreateChampionshipMatch, serverState];
};

export default usePostCreateChampionshipMatch;
