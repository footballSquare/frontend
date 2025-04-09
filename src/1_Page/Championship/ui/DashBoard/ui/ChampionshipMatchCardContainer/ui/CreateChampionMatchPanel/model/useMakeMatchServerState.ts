import React from "react";

type UseMakeMatchServerState = {
  serverState: Record<string, unknown> | null;
  handleToggleModal: () => void;
  fetchMatchList: () => void;
};
const useMakeMatchServerState = (props: UseMakeMatchServerState) => {
  const { serverState, handleToggleModal, fetchMatchList } = props;
  React.useEffect(() => {
    if (!serverState) return;

    switch (serverState.status) {
      case 200:
        fetchMatchList();
        handleToggleModal();
        break;
      case 400:
        console.error("서버 오류:", serverState.error);
        break;
      case 500:
        console.error("서버 오류:", serverState.error);
    }
  }, [serverState]);
};

export default useMakeMatchServerState;
