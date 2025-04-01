import React from "react";
import MemberCard from "./ui/MemberCard";

import useGetTeamMembers from "../../../../3_Entity/Team/useGetTeamMembers";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useManageMemberList from "./model/useManageMemberList";

const TeamMemberListBox = () => {
  const teamIdx = useParamInteger("teamIdx");

  const [page, setPage] = React.useState<number>(1);
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
    <div className=" h-[200px] overflow-scroll">
      {displayMemberList.length === 0 ? (
        <p className=" text-gray-500">현재 팀원이 없습니다.</p>
      ) : (
        displayMemberList.map((elem, index) => (
          <MemberCard
            {...elem}
            handleDelete={handleDelete}
            index={index}
            observeRef={
              teamMember.length === index + 1 ? observeRef : undefined
            }
          />
        ))
      )}
    </div>
  );
};

export default TeamMemberListBox;
