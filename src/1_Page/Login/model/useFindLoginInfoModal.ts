import React from "react";

const useFindLoginInfoModal = (): [boolean, () => void] => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return [isModalOpen, toggleModal];
};

export default useFindLoginInfoModal;
