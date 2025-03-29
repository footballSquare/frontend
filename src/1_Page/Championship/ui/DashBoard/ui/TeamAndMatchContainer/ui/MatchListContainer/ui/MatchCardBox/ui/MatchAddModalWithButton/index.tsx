import React from "react";
import CreateChaipionMatchModal from "./CreateChaipionMatchModal";

const MatchAddModalWithButton = (props: MatchAddModalWithButtonProps) => {
  const { teamList, handleAddMatch } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <button
        onClick={handleToggleModal}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        매치 생성
      </button>
      {isModalOpen && (
        <CreateChaipionMatchModal
          onClose={handleToggleModal}
          teamList={teamList}
          handleAddMatch={handleAddMatch}
        />
      )}
    </div>
  );
};

export default MatchAddModalWithButton;
