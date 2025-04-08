import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import EndChampionshipModal from "./ui/EndChampionshipModal";

const EndChampionshipPanel = () => {
  const [isModalOpen, handleToggleModal] = useToggleState();

  return (
    <div>
      <button
        onClick={handleToggleModal}
        className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100">
        대회 종료
      </button>
      {isModalOpen && <EndChampionshipModal onClose={handleToggleModal} />}
    </div>
  );
};

export default EndChampionshipPanel;
