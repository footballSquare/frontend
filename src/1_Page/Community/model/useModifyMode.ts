import React from "react";

const useModifyMode = (communityIdx?: number): [boolean, () => void] => {
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);

  // communityIdx가 변경될 때마다 modifyMode 초기화
  React.useEffect(() => {
    setModifyMode(false);
  }, [communityIdx]);

  const toggleModifyMode = () => {
    setModifyMode(!modifyMode);
  };

  return [modifyMode, toggleModifyMode];
};

export default useModifyMode;
