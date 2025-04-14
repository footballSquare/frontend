import React from "react";

const useManagePutServerState = ({
  putServerState,
  updateToSignPending,
}: UseManagePutServerStateProps) => {
  React.useEffect(() => {
    if (!putServerState) return;
    switch (putServerState.status) {
      case 200:
        updateToSignPending();
        alert("팀 가입 신청이 완료되었습니다.");
        break;
      case 403:
        alert("이미 가입한 팀이 있습니다");
        break;
      case 500:
        alert("서버 오류");
        break;
    }
  }, [putServerState]);
};

export default useManagePutServerState;
