import ChatWidget from "../../../2_Widget/ChatWidget";
import MakeMatchModal from "../../../2_Widget/MakeMatchModal";
import MatchModal from "../../../2_Widget/MatchModal";
import PostBoardModal from "../../../2_Widget/PostBoardModal";
import { useChatFloatingStroe } from "../../../4_Shared/zustand/useChatFloatingStroe";
import useMakeMatchModalStore from "../../../4_Shared/zustand/useMakeMatchModalStore";
import useMatchModalStore from "../../../4_Shared/zustand/useMatchModal";
import usePostBoardModalStore from "../../../4_Shared/zustand/usePostBoardModalStore";
const Modals = () => {
  const { isMatchModalOpen } = useMatchModalStore();
  const { isMakeMatchModalOpen } = useMakeMatchModalStore();
  const { isPostBoardModalOpen } = usePostBoardModalStore();
  const { isFloating } = useChatFloatingStroe();
  return (
    <div>
      {isMatchModalOpen && <MatchModal />}
      {isMakeMatchModalOpen && <MakeMatchModal />}
      {isPostBoardModalOpen && <PostBoardModal />}
      {isFloating && <ChatWidget />}
    </div>
  );
};

export default Modals;
