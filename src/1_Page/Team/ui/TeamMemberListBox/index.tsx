import React from "react";
import TeamMemberCard from "./ui/TeamMemberCard";

import useGetTeamMembers from "../../../../3_Entity/Team/useGetTeamMembers";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useManageMemberList from "./model/useManageMemberList";
import {
  useMyTeamIdx,
  useMyTeamRoleIdx,
  useMyUserIdx,
} from "../../../../4_Shared/lib/useMyInfo";

const TeamMemberListBox = () => {
  const teamIdx = useParamInteger("teamIdx");
  const [myIdx] = useMyUserIdx();
  const [myTeamIdx] = useMyTeamIdx();
  const [myTeamRoleIdx] = useMyTeamRoleIdx();
  const isTeamReader = myTeamIdx === teamIdx && myTeamRoleIdx === 0;

  // api
  const [page, setPage] = React.useState<number>(0);
  const [teamMember, hasMoreContent, loading] = useGetTeamMembers(
    teamIdx,
    page
  );
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  // optimistic state
  const [displayMemberList, handleDelete, handleChangeTeamRole] =
    useManageMemberList(teamMember);

  return (
    <div className="h-64 overflow-y-auto space-y-3">
      {displayMemberList.length === 0 && !loading && (
        <p className="text-gray-500">현재 팀원이 없습니다.</p>
      )}
      {displayMemberList.map((elem, index) => (
        <TeamMemberCard
          key={"member-" + index}
          {...elem}
          isMine={elem.player_list_idx === myIdx}
          isTeamReader={isTeamReader}
          handleChangeTeamRole={handleChangeTeamRole}
          handleDelete={handleDelete}
          observeRef={teamMember.length === index + 1 ? observeRef : undefined}
        />
      ))}
      {loading && (
        <div className="text-center text-sm text-gray-400">로딩 중...</div>
      )}
    </div>
  );
};

export default TeamMemberListBox;
