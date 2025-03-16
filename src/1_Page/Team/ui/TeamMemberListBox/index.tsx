import React from "react";
import { TeamMemberListBoxProps } from "./type";
import MemberCard from "./ui/MemberCard";

import useGetTeamMembers from "../../../../3_Entity/Team/useGetTeamMembers";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";

const TeamMemberListBox = (props: TeamMemberListBoxProps) => {
  const { teamIdx, isTeamReader } = props;

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

  return (
    <div className=" h-[200px] overflow-scroll">
      {teamMember.map((elem, index) => (
        <MemberCard
          {...elem}
          index={index}
          observeRef={teamMember.length === index + 1 ? observeRef : undefined}
          teamIdx={teamIdx}
          isTeamReader={isTeamReader}
        />
      ))}
    </div>
  );
};

export default TeamMemberListBox;
