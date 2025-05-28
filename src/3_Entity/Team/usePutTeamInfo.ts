import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutTeamInfo = (
  team_list_idx: number
): [
  putTeamInfo: (props: UsePutTeamInfoProps) => Promise<number | undefined>,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putTeamInfo = async (props: UsePutTeamInfoProps) => {
    const endPoint = `/team/${team_list_idx}`;
    return await request("PUT", endPoint, props, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putTeamInfo, serverState, loading];
};

export default usePutTeamInfo;
