import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
const usePostChangeTeamRole = (
  teamIdx: number
): [
  postChangeTeamRole: (userIdx: number, newRole: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const postChangeTeamRole = (userIdx: number, newRole: number) => {
    request({ userIdx, newRole });
    console.log("전송된 역할 변경 요청:", teamIdx, userIdx, newRole);
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

export default usePostChangeTeamRole;
