import React from "react";
const useStatInputModal = (): [boolean, () => void] => {
  const [isStatInputModalOpen, setIsStatInputModalOpen] =
    React.useState<boolean>(false);

  const toggleStatInputModal = () => {
    setIsStatInputModalOpen(!isStatInputModalOpen);
  };

  return [isStatInputModalOpen, toggleStatInputModal];
};

export default useStatInputModal;
