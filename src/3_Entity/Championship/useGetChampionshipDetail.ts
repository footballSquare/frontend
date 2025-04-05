import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetChampionshipDetail = (
  championshipMatchIdx: number
): [ChampionshipMatchDetail, boolean] => {
  const cacheRef = React.useRef<Record<number, ChampionshipMatchDetail>>({});

  const [serverState, request, loading] = useFetchData();

  // 초기 state는 캐시 여부에 따라 결정
  const [championshipDetail, setChampionshipDetail] =
    React.useState<ChampionshipMatchDetail>(() => {
      if (
        championshipMatchIdx !== 0 &&
        cacheRef.current[championshipMatchIdx]
      ) {
        return cacheRef.current[championshipMatchIdx];
      }
      return {} as ChampionshipMatchDetail;
    });

  // championshipMatchIdx가 변경되면 캐시된 데이터가 있으면 바로 state 업데이트
  React.useEffect(() => {
    if (championshipMatchIdx === 0) return;
    if (cacheRef.current[championshipMatchIdx]) {
      setChampionshipDetail(cacheRef.current[championshipMatchIdx]);
    }
  }, [championshipMatchIdx]);

  // API 호출: 캐시에 데이터가 없는 경우에만 호출
  React.useEffect(() => {
    console.log("cache : ", cacheRef.current);
    if (championshipMatchIdx === 0) return;
    if (cacheRef.current[championshipMatchIdx]) return;
    const endPoint = `/championship/championship_match/${championshipMatchIdx}/detail`;
    request("GET", endPoint, null, true);
  }, [championshipMatchIdx]);

  // 서버 응답이 오면 캐시에 저장하고 state 업데이트
  React.useEffect(() => {
    if (!loading && serverState && "championship_match" in serverState) {
      const detail = (
        serverState as { championship_match: ChampionshipMatchDetail }
      ).championship_match;
      cacheRef.current[championshipMatchIdx] = detail;
      setChampionshipDetail(detail);
    }
  }, [loading, serverState, championshipMatchIdx]);

  return [championshipDetail, loading];
};

export default useGetChampionshipDetail;
