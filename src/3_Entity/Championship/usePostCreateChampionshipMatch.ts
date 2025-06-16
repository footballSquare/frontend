import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCreateChampionshipMatch = (
  championshipListIdx: number
): [
  postCreateChampionshipMatch: (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => Promise<number | undefined>,
  idxList: number[],
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();
  const [idxList, setIdxList] = React.useState<number[]>([]);
  const postCreateChampionshipMatch = async (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => {
    const endPoint = `/championship/${championshipListIdx}/championship_match`;
    const result = await request("POST", endPoint, championshipMatchForm, true);
    return result;
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

        setIdxList([first_match_idx, second_match_idx, championship_match_idx]);
        break;
      }
      default:
        console.log("알 수 없는 상태:", serverState.status);
    }
  }, [serverState]);

  return [postCreateChampionshipMatch, idxList, loading];
};

export default usePostCreateChampionshipMatch;
