import { useNavigate } from "react-router-dom";
import useGetCommunityTeamApplicationList from "../../../../3_Entity/Community/useGetCommunityTeamApplicationList";

const CommunityTeamApplicationList = (
  props: CommunityTeamApplicationListProps
) => {
  const { communityIdx } = props;
  const [
    communityTeamApplicationList,
    //setCommunityTeamApplicationList,
  ] = useGetCommunityTeamApplicationList({
    communityIdx,
  });
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 rounded-xl shadow-md w-full flex flex-col gap-4 p-4">
      {communityTeamApplicationList.map((application, index) => {
        return (
          <div
            key={index}
            className={`border flex flex-col gap-4 justify-between border-gray-300 shadow-md rounded-lg p-4 min-h-[120px] hover:bg-blue-100 transition-all duration-300`}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              TEAM - {application.team_list_name}
            </h3>
            <button
              onClick={() => {
                navigate(`/team/${application.team_list_idx}`);
              }}
              className="border bg-white border-gray-300 p-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              팀 페이지로 이동하기
            </button>

            {/* 수락버튼 */}
            <button className="bg-blue-500 p-2 rounded-lg text-white text-sm font-medium hover:bg-blue-600 transition">
              수락
            </button>
            {/* 거절버튼 */}
            <button className="bg-red-500 p-2 rounded-lg text-white text-sm font-medium hover:bg-red-600 transition">
              거절
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityTeamApplicationList;
