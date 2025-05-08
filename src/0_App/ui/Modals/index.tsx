import MakeMatchModal from "../../../2_Widget/MakeMatchModal";
import MatchModal from "../../../2_Widget/MatchModal";
import PostBoardModal from "../../../2_Widget/PostBoardModal";
import useMakeMatchModalStore from "../../../4_Shared/zustand/useMakeMatchModalStore";
import useMatchModalStore from "../../../4_Shared/zustand/useMatchModal";
import usePostBoardModalStore from "../../../4_Shared/zustand/usePostBoardModalStore";
const Modals = () => {
  const { isMatchModalOpen } = useMatchModalStore();
  const { isMakeMatchModalOpen } = useMakeMatchModalStore();
  const { isPostBoardModalOpen } = usePostBoardModalStore();
  return (
    <div>
      {isMatchModalOpen && <MatchModal />}
      {isMakeMatchModalOpen && <MakeMatchModal />}
      {isPostBoardModalOpen && <PostBoardModal />}
    </div>
  );
};

export default Modals;
