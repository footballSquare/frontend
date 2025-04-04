import React from "react";

const useManageServerState = ({
  serverState,
  insertPostData,
  toggleMakeMatchModal,
}: UseManageServerStateProps) => {
  React.useEffect(() => {
    if (serverState) {
      if (serverState.status === 200 && serverState.matchData) {
        // 성공과 함께 반환된 매치 데이터 추가
        insertPostData(serverState.matchData as MatchInfo);
        alert("매치 생성 완료");
        toggleMakeMatchModal();
      } else {
        // 실패시 에러 처리
        alert("매치 생성 실패");
        toggleMakeMatchModal();
      }
    }
  }, [serverState]);
};

export default useManageServerState;
