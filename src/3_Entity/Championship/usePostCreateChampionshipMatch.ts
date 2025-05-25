import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCreateChampionshipMatch = (
  championshipListIdx: number
): [
  postCreateChampionshipMatch: (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => Promise<number | undefined>,
  serverState: Record<string, unknown> | null
] => {
  const [serverState, request] = useFetchData();

  const postCreateChampionshipMatch = async (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => {
    const endPoint = `/championship/${championshipListIdx}/championship_match`;
    return await request("POST", endPoint, championshipMatchForm, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        break;
      case "403":
    }
  }, [serverState]);

  return [postCreateChampionshipMatch, serverState];
};

export default usePostCreateChampionshipMatch;
