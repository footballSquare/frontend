import useTeamInfoContext from "../../../../4_Shared/model/useTeamInfoContext";
import useJoinAction from "./model/useJoinAction";
import useMakeTeamMatchModalStore from "../../../../4_Shared/zustand/useMakeMatchModalStore";
import useDeleteLeaveTeamHandler from "./model/useDeleteLeaveTeamHandler";
import useToggleState from "../../../../4_Shared/model/useToggleState";
import ManageModal from "./ui/ManageModal";
import usePutSignTeamHandler from "./model/usePutSignTeamHandler";

import exitIcon from "../../../../4_Shared/assets/svg/exit.svg";
import joinIcon from "../../../../4_Shared/assets/svg/join.svg";
import settingIcon from "../../../../4_Shared/assets/svg/setting.svg";
import { getTextColorFromBackground } from "../../../../4_Shared/lib/colorChecker";

const BtnGroupManageModalPanel = (props: BtnGroupManageModalPanelProps) => {
  const { teamInfo, handlers } = props;

  const [isModalOpen, handleToggleManageModal] = useToggleState();

  // 팀 권한과

  const { teamListColor } = useTeamInfoContext();

  // 팀 가입 신청 상태
  const {
    isTeamCaptain,
    isTeamSubLeader,
    isCurrentTeamMember,
    setMembershipToAvailable,
    setMembershipToUnavailable,
  } = useJoinAction();

  // api
  const [handleDeleteLeaveTeam] = useDeleteLeaveTeamHandler({
    setMembershipToAvailable,
    setMembershipToUnavailable,
  });
  const [handlePutSignTeam] = usePutSignTeamHandler();

  // 팀매치 생성 모달 전역으로 관리
  const { toggleMakeMatchModal } = useMakeTeamMatchModalStore(); // 팀매치 생성 모달 전역으로 관리

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      {!isTeamCaptain && (
        <div className="w-full max-w-xs">
          {isCurrentTeamMember ? (
            // 팀원일때
            <button
              className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white text-sm font-medium py-2.5 px-6 rounded-lg shadow-lg transition transform hover:translate-y-px duration-200 flex items-center justify-center"
              onClick={handleDeleteLeaveTeam}>
              <img src={exitIcon} alt="팀 탈퇴" className="h-4 w-4 mr-2" />팀
              탈퇴
            </button>
          ) : (
            // 팀원이 아닐때
            <button
              className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white text-sm font-medium py-2.5 px-6 rounded-lg shadow-lg transition transform hover:translate-y-px duration-200 flex items-center justify-center"
              onClick={handlePutSignTeam}>
              <img src={joinIcon} alt="팀 가입" className="h-4 w-4 mr-2" />팀
              가입
            </button>
          )}
        </div>
      )}

      {/* 팀 리더 및 매치 생성 버튼 그룹 */}
      <div className="flex gap-3">
        {/* 리더일때 */}
        {isTeamCaptain && (
          <button
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium py-2 px-4 rounded-lg border border-gray-700 shadow-md transition flex items-center"
            onClick={handleToggleManageModal}>
            <img src={settingIcon} alt="팀 관리" className="h-4 w-4 mr-1.5" />
            팀관리
          </button>
        )}

        {/* 팀장 또는 부팀장일떄 */}
        {(isTeamCaptain || isTeamSubLeader) && (
          <button
            className="text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md transition flex items-center"
            style={{
              backgroundColor: teamListColor,
              color: getTextColorFromBackground(teamListColor),
            }}
            onClick={toggleMakeMatchModal}>
            + 매치 생성
          </button>
        )}
      </div>

      {isModalOpen && (
        <ManageModal
          handleToggleManageModal={handleToggleManageModal}
          teamInfo={teamInfo}
          handlers={handlers}
        />
      )}
    </div>
  );
};

export default BtnGroupManageModalPanel;
