import { useFetchData } from "../../4_Shared/util/apiUtil";
import React from "react";
const usePutMatchEnd = (): [
  (props: PutMatchEndProps) => void,
  Record<string, unknown> | null,
  boolean
] => {
  const [serverState, request, loading] = useFetchData();
  const putMatchEnd = (props: PutMatchEndProps) => {
    const { matchIdx } = props;
    request("PUT", `/match/${matchIdx}`, null, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          //alert("매치가 마감되었습니다."); 낙관적 상태 업데이트를 위해 외부에서 처리
          break;
        default:
          break;
      }
    }
  }, [loading, serverState]);

  return [putMatchEnd, serverState, loading];
};
export default usePutMatchEnd;
