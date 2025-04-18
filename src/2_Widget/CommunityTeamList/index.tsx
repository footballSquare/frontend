import useGetCommunityTeamList from "../../3_Entity/Community/useGetCommunityTeamList";
import React from "react";
import useInfiniteScrollPaging from "../../4_Shared/model/useInfiniteScrollPaging";
import { useNavigate } from "react-router-dom";
import useDeleteCommunityTeam from "../../3_Entity/Community/useDeleteCommunityTeam";
const CommunityTeamList = (props: CommunityTeamListProps) => {
  const { communityIdx, modifyMode } = props;
  const [page, setPage] = React.useState<number>(0);
  const [communityTeamList, hasMoreContent, loading, setCommunityTeamList] =
    useGetCommunityTeamList({
      communityIdx,
      page,
    });
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );
  const navigate = useNavigate();
  const [deleteCommunityTeam] = useDeleteCommunityTeam();

  return (
    <div className="bg-gray-50 rounded-xl shadow-md w-full flex flex-col gap-2 overflow-y-auto p-2 overflow-auto h-[100%]">
      {communityTeamList.map((team, index) => {
        return (
          <div
            key={index}
            className={`border flex flex-col gap-4 justify-between border-gray-300 shadow-md rounded-lg p-4 hover:bg-blue-100 transition-all duration-300`}
            ref={
              communityTeamList.length === index + 1 ? observeRef : undefined
            }
          >
            <h3 className="text-lg font-semibold text-gray-800">
              TEAM - {team.team_list_name}
            </h3>
            <button
              onClick={() => {
                navigate(`/team/${team.team_list_idx}`);
              }}
              className="border bg-white border-gray-300 p-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              팀 페이지로 이동하기
            </button>
            {modifyMode && (
              <button
                onClick={() => {
                  deleteCommunityTeam({
                    communityIdx,
                    teamIdx: team.team_list_idx,
                  });
                  setCommunityTeamList((prev) =>
                    prev.filter(
                      (elem) => elem.team_list_idx !== team.team_list_idx
                    )
                  );
                }}
                className="bg-red-500 p-2 rounded-lg text-white text-sm hover:bg-red-600 transition"
              >
                팀 방출하기
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommunityTeamList;
