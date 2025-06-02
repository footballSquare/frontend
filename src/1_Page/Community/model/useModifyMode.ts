import React from "react";

const useModifyMode = (communityIdx?: number): [boolean, () => void] => {
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);

  // communityIdx가 변경될 때마다 modifyMode 초기화
  React.useEffect(() => {
    setModifyMode(false);
  }, [communityIdx]);

  const toggleModifyMod = () => {
    setModifyMode(!modifyMode);
  };

  return [modifyMode, toggleModifyMod];
};

export default useModifyMode;
