import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";
import { useNavigate } from "react-router-dom";

const useGetChampionshipInfo = (
  championshipListIdx: number
): [ChampionshipInfo, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const navigate = useNavigate();

  const [championshipInfo, setChampionshipInfo] =
    React.useState<ChampionshipInfo>({} as ChampionshipInfo);

  React.useEffect(() => {
    const endPoint = `/championship/${championshipListIdx}`;
    request("GET", endPoint, null, true);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "championship_data" in serverState) {
      switch (serverState.status) {
        case 200:
          setChampionshipInfo(
            (serverState as { championship_data: ChampionshipInfo })
              .championship_data
          );
          break;
        case 404:
          alert("요청한 페이지를 찾을 수 없습니다.");
          navigate(`/404`);
          break;
        case 500:
          alert("서버 내부 오류입니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [championshipInfo, loading];
};

export default useGetChampionshipInfo;
