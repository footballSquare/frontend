import { useNavigate } from "react-router-dom";
import useGetCommunityTeamApplicationList from "../../../../3_Entity/Community/useGetCommunityTeamApplicationList";
import usePostApproveCommunityTeamApplication from "../../../../3_Entity/Community/usePostApproveCommunityTeamApplication";
import useDeleteCommunityTeamApplication from "../../../../3_Entity/Community/useDeleteCommunityTeamApplication";

const CommunityTeamApplicationList = (
  props: CommunityTeamApplicationListProps
) => {
  const { communityIdx } = props;
  const [communityTeamApplicationList, setCommunityTeamApplicationList] =
    useGetCommunityTeamApplicationList({
      communityIdx,
    });
  const navigate = useNavigate();
  const [postApproveCommunityTeamApplication] =
    usePostApproveCommunityTeamApplication();
  const [deleteCommunityTeamApplication] = useDeleteCommunityTeamApplication();

  return (
    <div className="rounded-xl shadow-md w-full flex flex-col gap-4 p-4">
      {communityTeamApplicationList.map((application, index) => {
        return (
          <div
            key={index}
            className={`border flex flex-col gap-4 justify-between border-gray shadow-md rounded-lg p-4 min-h-[120px] hover:bg-grass transition-all duration-300`}
          >
            <h3 className="text-lg font-semibold text-gray">
              TEAM - {application.team_list_name}
            </h3>
            <button
              onClick={() => {
                navigate(`/team/${application.team_list_idx}`);
              }}
              className="border bg-gray border-gray p-2 rounded-lg text-sm font-medium hover:bg-grass transition"
            >
              팀 페이지로 이동하기
            </button>

            {/* 수락버튼 */}
            <button
              onClick={() => {
                postApproveCommunityTeamApplication({
                  communityIdx,
                  teamIdx: application.team_list_idx,
                });
                setCommunityTeamApplicationList((prev) =>
                  prev.filter(
                    (application) =>
                      application.team_list_idx !== application.team_list_idx
                  )
                );
              }}
              className="bg-blue-500 p-2 rounded-lg text-white text-sm font-medium hover:bg-blue-600 transition"
            >
              수락
            </button>
            {/* 거절버튼 */}
            <button
              onClick={() => {
                deleteCommunityTeamApplication({
                  communityIdx,
                  teamIdx: application.team_list_idx,
                });
                setCommunityTeamApplicationList((prev) =>
                  prev.filter(
                    (application) =>
                      application.team_list_idx !== application.team_list_idx
                  )
                );
              }}
              className="bg-red-500 p-2 rounded-lg text-white text-sm font-medium hover:bg-red-600 transition"
            >
              거절
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityTeamApplicationList;
