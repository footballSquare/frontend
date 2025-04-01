import React from "react";
const useManageMemberList = (
  teamMember: TeamMembers[]
): [TeamMembers[], (memberIdx: number) => void] => {
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
  return [displayMemberList, handleDelete];
};
export default useManageMemberList;
