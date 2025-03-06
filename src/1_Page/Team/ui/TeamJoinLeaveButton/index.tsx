import useDeleteLeaveTeam from "../../../../3_Entity/Team/useDeleteLeaveTeam";
import usePutSignTeam from "../../../../3_Entity/Team/usePutSignTeam";
import useMakeTeamMatchModalStore from "../../../../4_Shared/zustand/useMakeTeamMatchModal";
import useManageAction from "./model/useManageAction";

const TeamJoinLeaveButton = ({
  isTeamReader,
  isTeamPlayer,
  teamListIdx,
  handleMoveManagePage,
}: {
  isTeamPlayer: boolean;
  teamListIdx: number;
  isTeamReader: boolean;
  handleMoveManagePage: () => void;
}) => {
  const [deleteEvent] = useDeleteLeaveTeam(teamListIdx);
  const [putEvent] = usePutSignTeam(teamListIdx);
  const { setToggleModal } = useMakeTeamMatchModalStore();
  const [isTeamMember, isJoinRequestPending, handleJoinLeave] =
    useManageAction(isTeamPlayer);

  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      <div>
        {isJoinRequestPending ? (
          <button className="bg-black text-white text-sm font-medium py-1 px-3 rounded-full transition-all duration-300">
            가입신청중
          </button>
        ) : isTeamMember ? (
          <button
            className="bg-red-500 text-white text-sm font-medium py-1 px-3 rounded-full transition-all duration-300"
            onClick={() => handleJoinLeave(deleteEvent)}>
            팀 탈퇴
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full transition-all duration-300"
            onClick={() => handleJoinLeave(putEvent)}>
            팀 가입
          </button>
        )}
      </div>

      {/* 팀 리더일 경우에만 팀 관리 및 매치 생성 버튼 */}
      {isTeamReader && isTeamMember && !isJoinRequestPending && (
        <div className="flex gap-2 mt-2">
          <button
            className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full"
            onClick={handleMoveManagePage}>
            팀관리
          </button>
          <button
            className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full"
            onClick={setToggleModal}>
            매치 생성
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamJoinLeaveButton;
