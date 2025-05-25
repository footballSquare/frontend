import React from "react";
import usePostCreateChampionshipMatch from "../../../../../../../../../3_Entity/Championship/usePostCreateChampionshipMatch";
import useParamInteger from "../../../../../../../../../4_Shared/model/useParamInteger";
import { buildDummyChampionshipMatch } from "../lib/buildDummyData";

const usePostCreateChampionshipMatchHandler = (
  props: UseManageCreateChampionshipMatchProps
) => {
  const { filteredTeamList, handleAddMatch, handleSyncMatchIdx } = props;

  const championshipIdx = useParamInteger("championshipIdx");

  const postMatchIdxListRef = React.useRef<number[]>([]);

  const [postCreateChampionshipMatch, serverState] =
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

    const status = await postCreateChampionshipMatch(formData);
    switch (status) {
      case 200:
        console.log(serverState);
        handleSyncMatchIdx(postMatchIdxListRef.current[0], 2, 3);
        break;
      default:
        console.error("Failed to create championship match");
        break;
    }
  };
  return { handlePostCreateChampionshipMatch };
};

export default usePostCreateChampionshipMatchHandler;
