import React from "react";
import useGetTeamMembers from "../../../../3_Entity/Team/useGetTeamMembers";
import MemberCard from "./ui/MemberCard";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useValidParamInteger from "../../../../4_Shared/model/useValidParamInteger";

const TeamMemberListBox = () => {
  const [teamIdx] = useValidParamInteger("teamIdx");
  const [, forceRender]: [number, React.DispatchWithoutAction] =
    React.useReducer((prev: number) => prev + 1, 0);

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
          forceRender={forceRender}
          observeRef={teamMember.length === index + 1 ? observeRef : undefined}
        />
      ))}
    </div>
  );
};

export default TeamMemberListBox;
