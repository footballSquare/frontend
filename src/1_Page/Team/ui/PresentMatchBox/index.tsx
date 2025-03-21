import { useState } from "react";
import { PresentMatchBoxProps } from "./type";

import MatchCard from "./ui/MatchCrad";
import MakeTeamMatchModal from "./ui/MakeTeamMatchModal";

import useGetTeamMatchList from "../../../../3_Entity/Match/useGetTeamMatchList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useMakeTeamMatchModalStore from "../../../../4_Shared/zustand/useMakeTeamMatchModal";

const PresentMatchBox = (props: PresentMatchBoxProps) => {
  const { team_list_idx } = props;
  const [page, setPage] = useState<number>(1);
  const [teamMatchList, hasMoreContent, loading, refetch] = useGetTeamMatchList(
    page,
    team_list_idx
  );

  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  const { isModalOpen, setToggleModal } = useMakeTeamMatchModalStore();

  return (
    <div className="flex flex-col space-y-2 h-[300px] overflow-scroll">
      {teamMatchList.length === 0 ? (
        <div>진행중인 경기가 없습니다.</div>
      ) : (
        teamMatchList.map((elem, index) => (
          <MatchCard
            {...elem}
            index={index}
            observeRef={
              teamMatchList.length === index + 1 ? observeRef : undefined
            }
          />
        ))
      )}

      {isModalOpen && (
        <MakeTeamMatchModal
          team_list_idx={team_list_idx}
          onClose={setToggleModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default PresentMatchBox;
