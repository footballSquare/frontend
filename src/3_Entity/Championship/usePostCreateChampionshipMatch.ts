import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCreateChampionshipMatch = (
  championshipListIdx: number
): [
  postCreateChampionshipMatch: (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => void,
  postCreateChampionshipMatchData: ChampionshipMatchList,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();
  const [postCreateChampionshipMatchData, setPostCreateChampionshipMatchData] =
    React.useState<ChampionshipMatchList | null>(null);

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
        setPostCreateChampionshipMatchData(
          serverState.data as ChampionshipMatchList
        );
        break;
      case "403":
    }
  }, [serverState]);

  return [
    postCreateChampionshipMatch,
    postCreateChampionshipMatchData,
    loading,
  ];
};

export default usePostCreateChampionshipMatch;
