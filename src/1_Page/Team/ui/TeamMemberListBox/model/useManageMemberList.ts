import React from "react";

const useManageMemberList = (
  teamMember: TeamMembers[],
  myIdx: number | null
): UseManageMemberListReturn => {
  const [displayMemberList, setDisplayMemberList] = React.useState<
    TeamMembers[]
  >([] as TeamMembers[]);

  React.useEffect(() => {
    setDisplayMemberList(teamMember);
  }, [teamMember]);

  const handleDelete = (memberIdx: number) => {
    setDisplayMemberList((prev) =>
      prev.filter((member) => member.player_list_idx !== memberIdx)
    );
  };

  const handleChangeTeamRole = (memberIdx: number, team_role_idx: number) => {
    setDisplayMemberList((prev) =>
      prev.map((member) =>
        member.player_list_idx === memberIdx
          ? { ...member, team_role_idx }
          : member
      )
    );
  };

  const handleChangeMyRole = (team_role_idx: number) => {
    setDisplayMemberList((prev) =>
      prev.map((member) =>
        member.player_list_idx === myIdx ? { ...member, team_role_idx } : member
      )
    );
  };
  return {
    displayMemberList,
    handleDelete,
    handleChangeTeamRole,
    handleChangeMyRole,
  };
};
export default useManageMemberList;
