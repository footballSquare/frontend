import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCreateChampionshipMatch = (
  championshipListIdx: number
): [
  postCreateChampionshipMatch: (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => void,
  idxList: {
    first_match_idx: number;
    second_match_idx: number;
    championship_match_idx: number;
  },
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();
  const [idxList, setIdxList] = React.useState<{
    first_match_idx: number;
    second_match_idx: number;
    championship_match_idx: number;
  }>({ first_match_idx: 0, second_match_idx: 0, championship_match_idx: 0 });

  const postCreateChampionshipMatch = (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => {
    const endPoint = `/championship/${championshipListIdx}/championship_match`;
    request("POST", endPoint, championshipMatchForm, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200: {
        const { first_match_idx, second_match_idx, championship_match_idx } =
          serverState as {
            first_match_idx: number;
            second_match_idx: number;
            championship_match_idx: number;
          };
        setIdxList({
          first_match_idx,
          second_match_idx,
          championship_match_idx,
        });
        break;
      }
      default:
        console.log("Unknown status in serverState:", serverState.status);
    }
  }, [serverState]);

  return [postCreateChampionshipMatch, idxList, loading];
};

export default usePostCreateChampionshipMatch;
