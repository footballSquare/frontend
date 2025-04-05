import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
const usePutChangeTeamRole = (
  teamIdx: number
): [
  postChangeTeamRole: (userIdx: number, newRole: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const postChangeTeamRole = (userIdx: number, newRole: number) => {
    const endPoint = `/team/${teamIdx}/member/${userIdx}/role/${newRole}`;
    request("PUT", endPoint, null, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 403:
        return;
    }
  }, [serverState]);

  return [postChangeTeamRole, serverState, loading];
};

export default usePutChangeTeamRole;
