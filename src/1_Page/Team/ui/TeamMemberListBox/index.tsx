import React from "react";
import MemberCard from "./ui/MemberCard";

import useGetTeamMembers from "../../../../3_Entity/Team/useGetTeamMembers";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import { useCookies } from "react-cookie";

const TeamMemberListBox = () => {
  const teamIdx = useParamInteger("teamIdx");
  const [cookies] = useCookies(["team_role_idx"]);
  const isTeamReader = cookies.team_role_idx === 0;

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
          isTeamReader={isTeamReader}
        />
      ))}
    </div>
  );
};

export default TeamMemberListBox;
