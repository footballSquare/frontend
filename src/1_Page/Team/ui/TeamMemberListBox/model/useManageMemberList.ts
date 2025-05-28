import React from "react";

const useManageMemberList = (
  teamMember: TeamMembers[]
): UseManageMemberListReturn => {
  const sortMemberList = (list: TeamMembers[]) => {
    return [...list].sort((a, b) => {
      if (a.team_role_idx === b.team_role_idx) {
        return a.player_list_idx - b.player_list_idx;
      }
      return a.team_role_idx - b.team_role_idx;
    });
  };

  const [displayMemberList, setDisplayMemberList] = React.useState<
    TeamMembers[]
  >(() => sortMemberList(teamMember));

  React.useEffect(() => {
    setDisplayMemberList(sortMemberList(teamMember));
  }, [teamMember]);

  const handleDelete = (memberIdx: number) => {
    setDisplayMemberList((prev) =>
      sortMemberList(
        prev.filter((member) => member.player_list_idx !== memberIdx)
      )
    );
  };

  const handleChangeTeamRole = (memberIdx: number, team_role_idx: number) => {
    setDisplayMemberList((prev) =>
      sortMemberList(
        prev.map((member) =>
          member.player_list_idx === memberIdx
            ? { ...member, team_role_idx }
            : member
        )
      )
    );
  };

  return {
    displayMemberList,
    handleDelete,
    handleChangeTeamRole,
  };
};
export default useManageMemberList;
