import { useAuthStore } from "../../../../../4_Shared/lib/useMyInfo";
import useDeleteLeaveTeam from "../../../../../3_Entity/Team/useDeleteLeaveTeam";
import useParamInteger from "../../../../../4_Shared/model/useParamInteger";

const useDeleteLeaveTeamHandler = (props: UseDeleteLeaveTeamHandlerProps) => {
  const { setMembershipToAvailable, setMembershipToUnavailable } = props;
  const teamIdx = useParamInteger("teamIdx");
  const [deleteLeaveTeam] = useDeleteLeaveTeam(teamIdx);

  const { leaveTeam } = useAuthStore();

  const handleDeleteLeaveTeam = async () => {
    if (!confirm(`정말로 팀을 탈퇴 하시겠습니까?`)) return;
    const status = await deleteLeaveTeam();
    setMembershipToUnavailable();
    switch (status) {
      case 200:
        leaveTeam();
        break;
      default:
        setMembershipToAvailable();
        break;
    }
  };
  return [handleDeleteLeaveTeam];
};

export default useDeleteLeaveTeamHandler;
