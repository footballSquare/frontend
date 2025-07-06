import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCreateChampionshipMatch = (
  championshipListIdx: number
): [
  postCreateChampionshipMatch: (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => void,
  responseIdxList: CreateChampionMatchResponse | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();
  const [responseIdxList, setResponseIdxList] =
    React.useState<CreateChampionMatchResponse | null>(null);

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
        setResponseIdxList({
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

  return [postCreateChampionshipMatch, responseIdxList, loading];
};

export default usePostCreateChampionshipMatch;
