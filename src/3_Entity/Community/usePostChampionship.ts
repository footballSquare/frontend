import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostChampionship = (
  communityIdx: number
): [postChampionship: (formData: FormData) => void] => {
  const [serverState, request, loading] = useFetchData();

  const postChampionship = (formData: FormData) => {
    request("POST", `/community/${communityIdx}/championship`, formData, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("생성 완료 되었습니다.");
          break;
        default:
          alert("생성 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [postChampionship];
};

export default usePostChampionship;
