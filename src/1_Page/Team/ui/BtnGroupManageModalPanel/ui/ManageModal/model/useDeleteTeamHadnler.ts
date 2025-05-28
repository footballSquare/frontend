import { useNavigate } from "react-router-dom";
import useDeleteTeam from "../../../../../../../3_Entity/Team/useDeleteTeam";
import { useAuthStore } from "../../../../../../../4_Shared/lib/useMyInfo";
import useParamInteger from "../../../../../../../4_Shared/model/useParamInteger";

const useDeleteTeamHadnler = () => {
  const teamIdx = useParamInteger("teamIdx");
  const [deleteTeam] = useDeleteTeam(teamIdx);
  const navigate = useNavigate();

  const { leaveTeam } = useAuthStore();

  const handleDeleteTeam = async () => {
    const status = await deleteTeam();
    switch (status) {
      case 200:
        navigate("/team-list");
        leaveTeam();
        break;
      default:
        break;
    }
  };
  return [handleDeleteTeam];
};

export default useDeleteTeamHadnler;
