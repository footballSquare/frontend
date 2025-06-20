import useToggleState from "../../../../4_Shared/model/useToggleState";

import plusIcon from "../../../../4_Shared/assets/svg/plus.svg";
import CreateTeamModal from "./ui/CreateTeamModal";
import { useIsLogin, useMyTeamIdx } from "../../../../4_Shared/lib/useMyInfo";

const TeamCreatePanel = () => {
  const [isModalOpen, handleToggleModal] = useToggleState();
  const [isLogin] = useIsLogin();
  const [teamIdx] = useMyTeamIdx();
  return (
    <div>
      <div
        className="cursor-pointer bg-gray-800 hover:bg-gray-700 rounded-xl p-4 flex items-center justify-between active:bg-gray-700 transition-colors"
        onClick={() => {
          if (teamIdx) {
            alert("팀 생성은 팀이 없는 상태에서만 가능합니다.");
            return;
          }
          if (!isLogin) {
            alert("로그인 후 팀을 생성할 수 있습니다.");
            return;
          }
          handleToggleModal();
        }}>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-3">
            <img src={plusIcon} className="w-[20px] h-[20px]" />
          </div>
          <div>
            <h3 className="font-bold text-gray-100">새로운 팀 만들기</h3>
            <p className="text-sm text-gray-400">나만의 팀을 생성해보세요</p>
          </div>
        </div>
        <span className="text-gray-300">›</span>
      </div>

      {isModalOpen && <CreateTeamModal onClose={handleToggleModal} />}
    </div>
  );
};
export default TeamCreatePanel;
