import React from "react";

const useManagePage = (): [boolean, () => void] => {
  const [isManagePage, setIsManagePage] = React.useState<boolean>(false);

  const handleTogglePage = () => {
    setIsManagePage((prev) => !prev);
  };

  return [isManagePage, handleTogglePage];
};

export default useManagePage;
