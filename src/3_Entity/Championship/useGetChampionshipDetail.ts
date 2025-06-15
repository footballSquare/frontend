import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetChampionshipDetail = (
  championshipMatchIdx: number
): [ChampionshipMatchDetail, boolean] => {
  const cacheRef = React.useRef<Record<number, ChampionshipMatchDetail>>({});
  const requestedRef = React.useRef<Record<number, boolean>>({});
  const [serverState, request, loading] = useFetchData();

  // 초기 state는 캐시 여부에 따라 결정
  const [championshipDetail, setChampionshipDetail] =
    React.useState<ChampionshipMatchDetail>({} as ChampionshipMatchDetail);

  React.useEffect(() => {
    if (championshipMatchIdx === 0) return;

    // 필요한 경우, 서버 상태 초기화 로직 추가
    const cachedData = cacheRef.current[championshipMatchIdx];

    // 우선 캐시가 있으면 바로 사용
    if (cachedData) {
      setChampionshipDetail(cachedData);
      return;
    }

    // 아직 요청하지 않았다면 API 호출
    if (!requestedRef.current[championshipMatchIdx]) {
      requestedRef.current[championshipMatchIdx] = true;
      const endPoint = `/championship/championship_match/${championshipMatchIdx}/detail`;
      request("GET", endPoint, null, true);
      return;
    }

    // 서버 응답이 왔으면 캐시에 저장하고 state 업데이트
    if (!loading && serverState && "championship_match" in serverState) {
      const detail = (
        serverState as { championship_match: ChampionshipMatchDetail }
      ).championship_match;
      console.log("detail", detail);
      cacheRef.current[championshipMatchIdx] = detail;
      setChampionshipDetail(detail);
      return;
    }
  }, [championshipMatchIdx, loading, serverState, request]);
  return [championshipDetail, loading];
};

export default useGetChampionshipDetail;
