import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import EndChampionshipModal from "./ui/EndChampionshipModal";

const EndChampionshipPanel = () => {
  const [isModalOpen, handleToggleModal] = useToggleState();

  return (
    <div>
      <button
        onClick={handleToggleModal}
        className="px-3 py-1 text-sm border border-current rounded-md hover:bg-white/10 transition-colors">
        대회 종료
      </button>
      {isModalOpen && <EndChampionshipModal onClose={handleToggleModal} />}
    </div>
  );
};

export default EndChampionshipPanel;
