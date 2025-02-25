import MatchModal from "../../../2_Widget/MatchModal";
import useMatchModalStore from "../../../4_Shared/zustand/useMatchModal";
const Modals = () => {
  const { isMatchModalOpen } = useMatchModalStore();
  return <div>{isMatchModalOpen && <MatchModal />}</div>;
};

export default Modals;
