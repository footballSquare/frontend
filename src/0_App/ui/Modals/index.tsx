import MakeMatchModal from "../../../2_Widget/MakeMatchModal";
import MatchModal from "../../../2_Widget/MatchModal";
import useMakeMatchModalStore from "../../../4_Shared/zustand/useMakeMatchModalStore";
import useMatchModalStore from "../../../4_Shared/zustand/useMatchModal";
const Modals = () => {
  const { isMatchModalOpen } = useMatchModalStore();
  const { isMakeMatchModalOpen } = useMakeMatchModalStore();
  return (
    <div>
      {isMatchModalOpen && <MatchModal />}
      {isMakeMatchModalOpen && <MakeMatchModal />}
    </div>
  );
};

export default Modals;
