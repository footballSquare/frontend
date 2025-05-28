type ModalState = {
  detail: boolean;
  manage: boolean;
};

type ModalAction =
  | { type: "OPEN_DETAIL" }
  | { type: "OPEN_MANAGE" }
  | { type: "CLOSE_ALL" };

type UsePutChangeTeamRoleHandlerProps = {
  handleChangeTeamRole: (
    player_list_idx: number,
    team_role_idx: number
  ) => void;
};

type UseDeleteChangeTeamRoleHandlerProps = {
  handleDelete: (player_list_idx: number) => void;
};
