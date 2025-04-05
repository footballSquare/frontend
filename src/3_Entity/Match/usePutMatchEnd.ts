import { useFetchData } from "../../4_Shared/util/apiUtil";
import React from "react";
const usePutMatchEnd = (): [(props: PutMatchEndProps) => void] => {
  const [serverState, request, loading] = useFetchData();
  const putMatchEnd = (props: PutMatchEndProps) => {
    const { matchIdx } = props;
    request("PUT", `/match/${matchIdx}`, null, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("매치가 마감되었습니다.");
          break;
        case 403:
          alert("매치가 아직 종료되지 않았습니다.");
          break;
        case 429:
          alert("요청이 너무 많습니다! 잠시 기다려주세요.");
          break;
        default:
          break;
      }
    }
  }, [loading, serverState]);

  return [putMatchEnd];
};
export default usePutMatchEnd;
