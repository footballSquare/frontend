import React from "react";

const usePostOpenMatchModal = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = React.useState(false);

  const togglePostOpenMatchModal = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, togglePostOpenMatchModal];
};

export default usePostOpenMatchModal;
