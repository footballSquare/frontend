import useGetCommunityTeamList from "../../../../3_Entity/Community/useGetCommunityTeamList";
import React from "react";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import { useNavigate } from "react-router-dom";
import useDeleteCommunityTeam from "../../../../3_Entity/Community/useDeleteCommunityTeam";

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
    <div className="rounded-xl shadow-md w-full flex flex-col gap-2 overflow-y-auto p-2 overflow-auto text-gray bg-gray-700">
      {communityTeamList.map((team, index) => {
        return (
          <div
            key={index}
            ref={
              communityTeamList.length === index + 1 ? observeRef : undefined
            }
            onClick={() => {
              navigate(`/team/${team.team_list_idx}`);
            }}
            className="max-h-[100px] w-full bg-gray-800 shadow-md transition-all rounded-r cursor-pointer hover:bg-gray-900"
            style={{ borderLeft: `4px solid ${team.team_list_color}` }}
          >
            <div className="p-4 flex flex-col md:flex-row">
              {/* 왼쪽: 팀 정보 */}
              <div className="md:w-2/6 flex flex-col justify-center items-center md:items-start mb-2 md:mb-0 md:pr-3 border-r border-gray-700">
                {team.team_list_emblem && (
                  <img
                    src={team.team_list_emblem}
                    alt={`${team.team_list_name} Emblem`}
                    className="w-16 h-16 object-cover rounded-full border border-gray-300 shadow-md"
                  />
                )}
              </div>

              {/* 중앙: 팀 이름 및 약칭 */}
              <div className="flex justify-center items-center md:w-3/6 flex-col px-3">
                <div className="font-bold text-gray-200 text-sm">
                  {team.team_list_name}
                </div>
                <div className="text-xs text-gray-400">
                  약칭: {team.team_list_short_name}
                </div>
              </div>

              {/* 오른쪽: 수정 모드 버튼 */}
              {modifyMode && (
                <div className="md:w-1/6 flex flex-col md:flex-row justify-between items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("정말 팀을 방출하시겠습니까?")) {
                        deleteCommunityTeam({
                          communityIdx,
                          teamIdx: team.team_list_idx,
                        });
                        setCommunityTeamList((prev) =>
                          prev.filter(
                            (elem) => elem.team_list_idx !== team.team_list_idx
                          )
                        );
                      }
                    }}
                    className="bg-red-500 p-2 rounded-lg text-white text-sm hover:bg-red-600 transition"
                  >
                    팀 방출하기
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityTeamList;
