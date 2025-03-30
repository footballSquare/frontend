import React from "react";
const useEndModal = (): [boolean, () => void] => {
  const [isEndModalOpen, setIsEndModalOpen] = React.useState<boolean>(true);
  const handleToggleEndModal = () => {
    setIsEndModalOpen((prev) => !prev);
  };

  return [isEndModalOpen, handleToggleEndModal];
};

export default useEndModal;
