import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePostCreateChampionshipMatch = (
  championshipIdx: number
): [
  postEvent: (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const postEvent = (
    championshipMatchForm: UsePostCreateChampionshipMatchProps
  ) => {
    request({ championshipIdx, championshipMatchForm });
    console.log("전송된 데이터:", championshipIdx, championshipMatchForm);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case "403":
    }
  }, [serverState]);

  return [postEvent, serverState, loading];
};

export default usePostCreateChampionshipMatch;
