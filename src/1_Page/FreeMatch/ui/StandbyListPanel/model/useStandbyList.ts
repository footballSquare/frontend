import React from "react";

const useStandbyList = (): [boolean, () => void] => {
  const [isStandbyListOpen, setIsStandbyListOpen] =
    React.useState<boolean>(false);

  const toggleStanbyList = () => {
    setIsStandbyListOpen(!isStandbyListOpen);
  };

  return [isStandbyListOpen, toggleStanbyList];
};

export default useStandbyList;
