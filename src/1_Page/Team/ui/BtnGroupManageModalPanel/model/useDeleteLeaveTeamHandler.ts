import { useAuthStore } from "../../../../../4_Shared/lib/useMyInfo";
import useDeleteLeaveTeam from "../../../../../3_Entity/Team/useDeleteLeaveTeam";
import useParamInteger from "../../../../../4_Shared/model/useParamInteger";

const useDeleteLeaveTeamHandler = (cancelUpdateToLeave: () => void) => {
  const teamIdx = useParamInteger("teamIdx");
  const [deleteLeaveTeam] = useDeleteLeaveTeam(teamIdx);

  const { leaveTeam } = useAuthStore();

  const handleDeleteLeaveTeam = async () => {
    const status = await deleteLeaveTeam();
    switch (status) {
      case 200:
        leaveTeam();
        break;
      default:
        cancelUpdateToLeave();
        break;
    }
  };
  return [handleDeleteLeaveTeam];
};

export default useDeleteLeaveTeamHandler;
