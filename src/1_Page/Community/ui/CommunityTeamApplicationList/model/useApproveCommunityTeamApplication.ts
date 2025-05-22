import useDeleteCommunityTeamApplication from "../../../../../3_Entity/Community/useDeleteCommunityTeamApplication";
import usePostApproveCommunityTeamApplication from "../../../../../3_Entity/Community/usePostApproveCommunityTeamApplication";

const useApproveCommunityTeamApplication = (
  props: UseApproveCommunityTeamApplicationProps
): [
  approveCommunityTeamApplication: (
    props: ApproveCommunityTeamApplicationProps
  ) => Promise<void>,
  disApproveCommunityTeamApplication: (
    props: DisApproveCommunityTeamApplicationProps
  ) => Promise<void>
] => {
  const { setCommunityTeamApplicationList } = props;
  const [deleteCommunityTeamApplication] = useDeleteCommunityTeamApplication();
  const [postApproveCommunityTeamApplication] =
    usePostApproveCommunityTeamApplication();

  const approveCommunityTeamApplication = async (
    props: ApproveCommunityTeamApplicationProps
  ) => {
    const { communityIdx, teamIdx } = props;
    const status = await postApproveCommunityTeamApplication({
      communityIdx,
      teamIdx,
    });
    if (typeof status === "number" && status === 200) {
      setCommunityTeamApplicationList((prev) =>
        prev.filter((item) => item.team_list_idx !== teamIdx)
      );
    }
  };

  const disApproveCommunityTeamApplication = async (
    props: DisApproveCommunityTeamApplicationProps
  ) => {
    const { communityIdx, teamIdx } = props;
    const status = await deleteCommunityTeamApplication({
      communityIdx,
      teamIdx,
    });
    if (typeof status === "number" && status === 200) {
      setCommunityTeamApplicationList((prev) =>
        prev.filter((item) => item.team_list_idx !== teamIdx)
      );
    }
  };

  return [approveCommunityTeamApplication, disApproveCommunityTeamApplication];
};

export default useApproveCommunityTeamApplication;
