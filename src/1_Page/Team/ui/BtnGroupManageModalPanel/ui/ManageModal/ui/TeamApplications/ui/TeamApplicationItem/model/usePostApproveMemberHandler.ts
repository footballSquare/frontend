import usePostApproveMember from "../../../../../../../../../../../3_Entity/Team/usePostApproveMember";

const usePostApproveMemberHandler = (
  props: UseApproveMemberHandlerProps
): UsePostApproveMemberHandlerReturn => {
  const { team_list_idx, excludePlayerById, includePayerById } = props;
  const [postApproveMember] = usePostApproveMember(team_list_idx);

  const handlePostApproveMember = async (userIdx: number) => {
    excludePlayerById(userIdx);
    const status = await postApproveMember(userIdx);
    switch (status) {
      case 200:
        break;
      default:
        includePayerById(userIdx);
        break;
    }
  };
  return { handlePostApproveMember };
};
export default usePostApproveMemberHandler;
