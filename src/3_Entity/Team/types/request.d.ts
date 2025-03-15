export type PutTeamInfoProps = {
  team_name: string;
  team_short_name: string;
  team_color: string;
  team_announcement: string;
  status_idx: number;
};

export type TeamRoleUpdate = {
  userIdx: number;
  newRole: number;
};
