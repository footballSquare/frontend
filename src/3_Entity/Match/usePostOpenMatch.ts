import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostOpenMatch = (): [
  (props: PostOpenMatchProps) => void,
  Record<string, unknown> | null
] => {
  const [serverState, request, loading] = useFetchData();
  const postOpenMatch = (props: PostOpenMatchProps) => {
    request("POST", `/match/open`, props, true);
    console.log(props);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      if (serverState.status === 200) {
        alert("매치가 생성되었습니다.");
      } else {
        alert("매치 생성에 실패했습니다.");
      }
    }
  }, [loading, serverState]);

  return [postOpenMatch, serverState];
};
export default usePostOpenMatch;
