import React from "react";

const useShowToggle = (): [boolean, () => void] => {
  const [showAllTeams, setShowAllTeams] = React.useState<boolean>(false);
  const handleToggle = () => {
    setShowAllTeams((prev) => !prev);
  };
  return [showAllTeams, handleToggle];
};

export default useShowToggle;
