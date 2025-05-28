import useDeleteTeamPlayer from "../../../../../../../3_Entity/Team/useDeleteTeamPlayer";
import useParamInteger from "../../../../../../../4_Shared/model/useParamInteger";

const useDeleteChangeTeamRoleHandler = (
  props: UseDeleteChangeTeamRoleHandlerProps
) => {
  const { handleDelete } = props;
  const teamIdx = useParamInteger("teamIdx");
  const [deleteTeamPlayer] = useDeleteTeamPlayer(teamIdx);

  const handleDeleteTeamPlayer = async (player_list_idx: number) => {
    const status = await deleteTeamPlayer(player_list_idx);
    if (!status) return;
    switch (status) {
      case 200:
        handleDelete(player_list_idx);
        break;
    }
  };

  return { handleDeleteTeamPlayer };
};
export default useDeleteChangeTeamRoleHandler;
