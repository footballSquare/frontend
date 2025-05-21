import React from "react";

const useTermOfUseModal = (): [boolean, () => void] => {
  const [isTermOfUseModalOpen, setIsTermOfUseModalOpen] =
    React.useState<boolean>(true); // 회원가입에서 step 2 진입시 자동 오픈

  const toggleIsTermOfUseModal = () => {
    setIsTermOfUseModalOpen(!isTermOfUseModalOpen);
  };

  return [isTermOfUseModalOpen, toggleIsTermOfUseModal];
};

export default useTermOfUseModal;
