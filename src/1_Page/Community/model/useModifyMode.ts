import React from "react";

const useModifyMode = (): [boolean, () => void] => {
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);

  const toggleModifyMod = () => {
    setModifyMode(!modifyMode);
  };

  return [modifyMode, toggleModifyMod];
};

export default useModifyMode;
