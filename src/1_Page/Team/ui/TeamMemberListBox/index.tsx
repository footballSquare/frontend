import React from "react";
import useGetTeamMembers from "../../../../3_Entity/Team/useGetTeamMembers";
import MemberCard from "./ui/MemberCard";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";

const TeamMemberListBox = () => {
  const [page, setPage] = React.useState<number>(1);
  const [teamMember, hasMoreContent, loading] = useGetTeamMembers(page);
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );
  return (
    <div className=" h-[200px] overflow-scroll">
      {teamMember.map((elem, index) => (
        <MemberCard
          {...elem}
          index={index}
          observeRef={teamMember.length === index + 1 ? observeRef : undefined}
        />
      ))}
    </div>
  );
};

export default TeamMemberListBox;
