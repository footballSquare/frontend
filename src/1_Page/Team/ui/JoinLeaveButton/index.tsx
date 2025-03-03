import useDeleteLeaveTeam from "../../../../3_Entity/Team/useDeleteLeaveTeam";
import usePutSignTeam from "../../../../3_Entity/Team/usePutSignTeam";

const JoinLeaveButton = ({
  isTeamPlayer,
  teamListIdx,
}: {
  isTeamPlayer: boolean;
  teamListIdx: number;
}) => {
  const [deleteEvent] = useDeleteLeaveTeam(teamListIdx);
  const [putEvent] = usePutSignTeam(teamListIdx);

  const handleJoinLeave = () => {
    const action = isTeamPlayer ? "탈퇴" : "가입";
    if (confirm(`정말로 팀을 ${action}하시겠습니까?`)) {
      if (isTeamPlayer) {
        deleteEvent();
      } else {
        putEvent();
      }
    }
  };

  return (
    <button
      className={`${
        isTeamPlayer ? "bg-red-500" : "bg-blue-500"
      } text-white text-sm font-medium py-1 px-3 rounded-full transition-all duration-300`}
      onClick={handleJoinLeave}
      aria-label={isTeamPlayer ? "팀 탈퇴 버튼" : "팀 가입 버튼"}>
      {isTeamPlayer ? "팀 탈퇴" : "팀 가입"}
    </button>
  );
};

export default JoinLeaveButton;
