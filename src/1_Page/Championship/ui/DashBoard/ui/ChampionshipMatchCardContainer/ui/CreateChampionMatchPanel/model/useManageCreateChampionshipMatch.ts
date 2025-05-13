import React from "react";

type UseManageCreateChampionshipMatchProps = {
  serverState: Record<string, unknown> | null;
  handleToggleModal: () => void;
};
const useManageCreateChampionshipMatch = (
  props: UseManageCreateChampionshipMatchProps
) => {
  const { serverState, handleToggleModal } = props;
  React.useEffect(() => {
    if (!serverState) return;

    switch (serverState.status) {
      case 200:
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

export default useManageCreateChampionshipMatch;
