import React from "react";
import usePostCreateChampionshipMatch from "../../../../../../../../../3_Entity/Championship/usePostCreateChampionshipMatch";
import useParamInteger from "../../../../../../../../../4_Shared/model/useParamInteger";
import { buildDummyChampionshipMatch } from "../lib/buildDummyData";

const usePostCreateChampionshipMatchHandler = (
  props: UseManageCreateChampionshipMatchProps
) => {
  const {
    filteredTeamList,
    handleAddMatch,
    handleSyncMatchIdx,
    handleMatchSelect,
    handleBackToList,
    handleDeleteMatch,
  } = props;

  const championshipIdx = useParamInteger("championshipIdx");

  const postMatchIdxListRef = React.useRef<number[]>([]);

  const [postCreateChampionshipMatch, responseIdxList, loading] =
    usePostCreateChampionshipMatch(championshipIdx);

  const handlePostCreateChampionshipMatch = async (
    data: CreateChampionMatchFormValues
  ) => {
    const formData = {
      first_team_idx: data.teams[0],
      second_team_idx: data.teams[1],
      match_match_start_time: `${data.matchDate} ${data.startTime}:00`,
    };

    const dummyMatchIdx = Date.now(); // 더미용 unique key
    postMatchIdxListRef.current.push(dummyMatchIdx);
    // 부족 데이터를 더미로 해서 매치 UI 생성
    // 이후 side Effect로 의존성 주입
    handleAddMatch(
      buildDummyChampionshipMatch(dummyMatchIdx, formData, filteredTeamList)
    );
    postCreateChampionshipMatch(formData);
  };

  // 의존성 주입
  React.useEffect(() => {
    // 아직 요청 중이거나 응답이 없는 경우 아무 것도 하지 않음
    if (loading || !responseIdxList) return;
    // 로딩이 끝났고 응답 값이 정상적인 경우(성공)
    if (
      responseIdxList.championship_match_idx &&
      responseIdxList.first_match_idx &&
      responseIdxList.second_match_idx
    ) {
      handleSyncMatchIdx(
        postMatchIdxListRef.current[0],
        responseIdxList.championship_match_idx,
        responseIdxList.first_match_idx,
        responseIdxList.second_match_idx
      );

      handleMatchSelect(responseIdxList.championship_match_idx);

      postMatchIdxListRef.current = [];
    } else {
      handleBackToList();
      handleDeleteMatch(postMatchIdxListRef.current[0]);
      alert("매치 생성에 실패했습니다. 다시 시도해주세요.");
      postMatchIdxListRef.current = [];
    }
  }, [
    responseIdxList,
    loading,
    handleSyncMatchIdx,
    handleMatchSelect,
    handleBackToList,
    handleDeleteMatch,
  ]);
  return { handlePostCreateChampionshipMatch };
};

export default usePostCreateChampionshipMatchHandler;
