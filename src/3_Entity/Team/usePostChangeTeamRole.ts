import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
const usePostChangeTeamRole = ({
  onSuccess,
}: {
  onSuccess: () => void;
}): [
  postEvent: (userIdx: number, newRole: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const postEvent = (userIdx: number, newRole: number) => {
    request({ userIdx, newRole });
    onSuccess?.();
    console.log("전송된 역할 변경 요청:", userIdx, newRole);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 403:
        return;
    }
    onSuccess?.();
  }, [serverState]);

  return [postEvent, serverState, loading];
};

export default usePostChangeTeamRole;
