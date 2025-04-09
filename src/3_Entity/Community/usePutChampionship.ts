import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutChampionship = (
  communityIdx: number
): [putChampionship: (props: PutChampionshipProps) => void] => {
  const [serverState, request, loading] = useFetchData();

  const putChampionship = (props: PutChampionshipProps) => {
    request("POST", `/community/${communityIdx}/championship`, props, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("수정 완료");
          break;
        default:
          alert("수정 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [putChampionship];
};

export default usePutChampionship;
