import useDeleteApproveMember from "../../../../../../../../../../../3_Entity/Team/useDeleteApproveMember";

const useDeleteApproveMemberHandler = (
  props: UseApproveMemberHandlerProps
): UseDeleteApproveMemberHandlerReturn => {
  const { team_list_idx, excludePlayerById, includePayerById } = props;
  const [deleteApproveMember] = useDeleteApproveMember(team_list_idx);

  const handleDeleteApproveMember = async (userIdx: number) => {
    excludePlayerById(userIdx);
    const status = await deleteApproveMember(userIdx);
    switch (status) {
      case 200:
        break;
      default:
        includePayerById(userIdx);
        break;
    }
  };
  return { handleDeleteApproveMember };
};
export default useDeleteApproveMemberHandler;
