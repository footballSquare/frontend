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
    console.log(serverState);
    switch (serverState.status) {
      case 200:
        alert("팀 생성 완료");
        break;
      case 400:
        alert("양식 오류입니다");
        break;
      case 403:
        alert("이미 소속팀이 존재합니다");
        return;
    }
  }, [serverState]);

  return [postMakeTeam, serverState, loading];
};

export default usePostMakeTeam;
