import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { PutTeamInfoProps } from "./types/request";

const usePutTeamInfo = (
  team_list_idx: number
): [
  putTeamInfo: (props: PutTeamInfoProps) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const putTeamInfo = (props: PutTeamInfoProps) => {
    const { ...data } = props;
    request({ ...data, team_list_idx });
    console.log("팀 정보 수정", team_list_idx);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putTeamInfo, serverState, loading];
};

export default usePutTeamInfo;
