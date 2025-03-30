import React from "react";

const useModal = (): [boolean, () => void] => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const handleToogleModal = () => setIsModalOpen(!isModalOpen);

  return [isModalOpen, handleToogleModal];
};

export default useModal;
