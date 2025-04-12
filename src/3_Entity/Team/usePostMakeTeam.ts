import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
const usePostMakeTeam = (): [
  postMakeTeam: (props: UsePostMakeTeam) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const postMakeTeam = (props: UsePostMakeTeam) => {
    const endPoint = `/team`;
    request("POST", endPoint, props, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 403:
        return;
    }
  }, [serverState]);

  return [postMakeTeam, serverState, loading];
};

export default usePostMakeTeam;
