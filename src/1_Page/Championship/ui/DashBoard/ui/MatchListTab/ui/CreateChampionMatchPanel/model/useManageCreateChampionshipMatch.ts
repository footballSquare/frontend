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

  const [postCreateChampionshipMatch, idxList, loading] =
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
    handleAddMatch(
      buildDummyChampionshipMatch(dummyMatchIdx, formData, filteredTeamList)
    );
    postCreateChampionshipMatch(formData);
  };

  React.useEffect(() => {
    // 아직 요청 중이거나 응답이 없는 경우 아무 것도 하지 않음
    if (loading || idxList.length === 0) return;
    // 로딩이 끝났고 응답 값이 정상적인 경우(성공)
    if (idxList.length >= 3) {
      handleSyncMatchIdx(
        postMatchIdxListRef.current[0],
        idxList[2],
        idxList[1],
        idxList[0]
      );
      handleMatchSelect(idxList[2]);

      postMatchIdxListRef.current = [];
    } else {
      handleBackToList();
      handleDeleteMatch(postMatchIdxListRef.current[0]);
      alert("매치 생성에 실패했습니다. 다시 시도해주세요.");
      postMatchIdxListRef.current = [];
    }
  }, [idxList, loading, handleSyncMatchIdx, handleMatchSelect]);
  return { handlePostCreateChampionshipMatch };
};

export default usePostCreateChampionshipMatchHandler;
