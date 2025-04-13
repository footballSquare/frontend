import useToggleState from "../../../../4_Shared/model/useToggleState";

import plusCircleIcon from "../../../../4_Shared/assets/svg/plus_circle_blue.svg";
import CreateTeamModal from "./ui/CreateTeamModal";

const TeamCreatePanel = () => {
  const [isModalOpen, handleToggleModal] = useToggleState();

  return (
    <div>
      <div
        className="bg-white rounded-xl p-4 flex items-center justify-between active:bg-gray-50 transition-colors"
        onClick={handleToggleModal}>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-3">
            <span className="text-blue-500">
              <img src={plusCircleIcon} className="w-full h-full" />
            </span>
          </div>
          <div>
            <h3 className="font-bold">새로운 팀 만들기</h3>
            <p className="text-sm text-gray-500">나만의 팀을 생성해보세요</p>
          </div>
        </div>
        <span className="text-gray-400">›</span>
      </div>

      {isModalOpen && <CreateTeamModal handleToggleModal={handleToggleModal} />}
    </div>
  );
};
export default TeamCreatePanel;
