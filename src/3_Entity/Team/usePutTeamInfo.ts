import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutTeamInfo = (
  team_list_idx: number
): [
  putTeamInfo: (props: UsePutTeamInfoProps) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putTeamInfo = (props: UsePutTeamInfoProps) => {
    const endPoint = `/team/${team_list_idx}`;
    request("PUT", endPoint, props, true);
    console.log("팀 정보 수정", team_list_idx);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putTeamInfo, serverState, loading];
};

export default usePutTeamInfo;
