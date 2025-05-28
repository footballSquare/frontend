import usePutChangeTeamRole from "../../../../../../../3_Entity/Team/usePutChangeTeamRole";
import {
  useAuthStore,
  useMyTeamRoleIdx,
  useMyUserIdx,
} from "../../../../../../../4_Shared/lib/useMyInfo";
import useParamInteger from "../../../../../../../4_Shared/model/useParamInteger";

const usePutChangeTeamRoleHandler = (
  props: UsePutChangeTeamRoleHandlerProps
) => {
  const { handleChangeTeamRole } = props;
  const teamIdx = useParamInteger("teamIdx");
  const [putChangeTeamRole] = usePutChangeTeamRole(teamIdx);
  const { setTeamRoleIdx } = useAuthStore();
  const [myIdx] = useMyUserIdx();
  const [myTeamRoleIdx] = useMyTeamRoleIdx();

  const handlePutChangeTeamRole = async (
    player_list_idx: number,
    team_role_idx: number
  ) => {
    let isTeamLeaderChange = false;

    if (
      myTeamRoleIdx === 0 &&
      team_role_idx === 0 &&
      confirm("팀장을 양도하면 부팀장이 됩니다. 계속하시겠습니까?")
    ) {
      isTeamLeaderChange = true;
    }

    const status = await putChangeTeamRole(player_list_idx, team_role_idx);
    if (!status) return;
    switch (status) {
      case 200:
        handleChangeTeamRole(player_list_idx, team_role_idx);
        if (isTeamLeaderChange && myIdx) {
          setTeamRoleIdx(1);
          handleChangeTeamRole(myIdx, 1);
        }
    }
  };

  return { handlePutChangeTeamRole };
};
export default usePutChangeTeamRoleHandler;
