import React from "react";
import usePutMatchEnd from "../../../3_Entity/Match/usePutMatchEnd";

const useMatchEnd = (props: UseMatchEndProps) => {
  const { setMatchDetail } = props;
  const [putMatchEnd, serverState, loading] = usePutMatchEnd();

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          setMatchDetail((prev) => ({ ...prev, common_status_idx: 1 })); // 매치 상태를 종료로 변경
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
  }, [setMatchDetail, loading, serverState]);

  const matchEndHandler = (props: MatchEndHandlerProps) => {
    const { matchIdx } = props;
    putMatchEnd({ matchIdx });
  };

  return [matchEndHandler];
};

export default useMatchEnd;
