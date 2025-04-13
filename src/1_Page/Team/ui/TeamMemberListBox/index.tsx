import React from "react";
import MemberCard from "./ui/MemberCard";

import useGetTeamMembers from "../../../../3_Entity/Team/useGetTeamMembers";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useManageMemberList from "./model/useManageMemberList";

const TeamMemberListBox = () => {
  const teamIdx = useParamInteger("teamIdx");

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

  const [displayMemberList, handleDelete] = useManageMemberList(teamMember);

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3 h-64 overflow-y-auto space-y-3">
      {displayMemberList.length === 0 && !loading && (
        <p className="text-gray-500">현재 팀원이 없습니다.</p>
      )}
      {displayMemberList.map((elem, index) => (
        <MemberCard
          key={"member-" + index}
          {...elem}
          handleDelete={handleDelete}
          index={index}
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
