import { useParams } from "react-router-dom";
import ChampionshipList from "./ui/ChampionShipList";
import CommunityStaffList from "./ui/CommunityStaffList";
import CommunityTeamList from "../../2_Widget/CommunityTeamList";
import useModifyMode from "./model/useModifyMode";
import useGetCommunityInfo from "../../3_Entity/Community/useGetCommunityInfo";
import useIsCommunityStaffStore from "../../4_Shared/zustand/useIsCommunityStaffStore";

const Community = () => {
  const { communityIdx } = useParams();
  const [modifyMode, toggleModifyMode] = useModifyMode();
  const [communityInfo] = useGetCommunityInfo({
    communityIdx: Number(communityIdx),
  });
  const { isCommunityStaff } = useIsCommunityStaffStore();
  return (
    <div className="h-full w-full p-6 flex gap-6">
      {/* Left Sidebar */}
      <div className="flex flex-col gap-6 bg-white rounded-xl shadow-md p-6 w-full max-w-[360px]">
        {/* 커뮤니티 앰블럼, 커뮤니티 명 */}
        <div className="flex flex-col items-center">
          <img
            src={communityInfo.community_list_emblem}
            alt="emblem"
            className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl mb-4 shadow-lg"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            {communityInfo.community_list_name}
          </h2>
        </div>
        {/* 배너&엠블럼 수정 버튼 */}
        {modifyMode && (
          <div className="flex flex-col gap-4 mx-auto">
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                배너 이미지 변경
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                엠블럼 이미지 변경
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* 커뮤니티 운영진 목록 & 운영진 지원 */}
        <CommunityStaffList communityIdx={Number(communityIdx)} />

        {/* 커뮤니티 수정 버튼 */}
        {isCommunityStaff && (
          <button
            className="p-3 border border-gray-300 shadow-md rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 transition"
            onClick={toggleModifyMode}
          >
            {modifyMode ? "수정 취소" : "커뮤니티 정보 수정하기"}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6 w-full">
        {/* 배너 */}
        <div className="w-full min-h-[160px] bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold rounded-lg shadow-md">
          배너 이미지
        </div>

        <div className="flex gap-6 overflow-auto max-h-[80%]">
          {modifyMode ? (
            <>
              {/* CommunityTeamList */}
              <div className="w-full">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                  Community Teams
                </h3>
                <CommunityTeamList
                  communityIdx={Number(communityIdx)}
                  modifyMode={modifyMode}
                />
              </div>

              {/* 가입 신청 팀 목록 */}

              {/* 운영진 가입 신청 유저 목록 */}
            </>
          ) : (
            <>
              {/* ChampionshipList */}
              <div className="w-full">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                  Championship
                </h3>
                <ChampionshipList communityIdx={Number(communityIdx)} />
              </div>

              {/* BoardList */}

              {/* CommunityTeamList */}
              <div className="w-full">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                  Community Teams
                </h3>
                <CommunityTeamList
                  communityIdx={Number(communityIdx)}
                  modifyMode={modifyMode}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
