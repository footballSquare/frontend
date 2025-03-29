import { useParams } from "react-router-dom";
import ChampionshipList from "./ui/ChampionShipList";
import CommunityStaffList from "./ui/CommunityStaffList";
import CommunityTeamList from "../../2_Widget/CommunityTeamList";
import useModifyMode from "./model/useModifyMode";
import useGetCommunityInfo from "../../3_Entity/Community/useGetCommunityInfo";
const Community = () => {
  const { communityIdx } = useParams();
  const isCommunityAdmin = true;
  const [modifyMode, toggleModifyMode] = useModifyMode();
  const [communityInfo] = useGetCommunityInfo({
    communityIdx: Number(communityIdx),
  });
  return (
    <div className="bg-white w-full p-4 flex gap-4">
      {/* Left Sidebar */}
      <div className="flex flex-col gap-4 bg-white rounded-lg shadow p-4 w-full max-w-[360px]">
        {/* 커뮤니티 앰블럼, 커뮤니티 명 */}
        <div className="flex flex-col items-center">
          <img
            src={communityInfo.community_list_emblem}
            alt="emblem"
            className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl mb-2"
          />
          <h2 className="text-xl font-bold">
            {communityInfo.community_list_name}
          </h2>
        </div>
        {/* 배너&엠블럼 수정 버튼 */}
        {modifyMode && (
          <div className="flex flex-col gap-2 mx-auto">
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-blue mb-1">
                배너 이미지 변경
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm border border-gray rounded-lg cursor-pointer focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-blue mb-1">
                엠블럼 이미지 변경
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-900 border border-gray rounded-lg cursor-pointer focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* 커뮤니티 운영진 목록 */}
        <CommunityStaffList communityIdx={Number(communityIdx)} />

        {/* 커뮤니티 상호작용 버튼 (운영진 지원, 수정) */}
        {isCommunityAdmin ? (
          <button
            className=" p-2 border border-gray shadow-lg rounded-[4px] text-sm"
            onClick={toggleModifyMode}
          >
            {modifyMode ? "수정 취소" : "커뮤니티 정보 수정하기"}
          </button>
        ) : (
          <button className=" p-2 border border-gray shadow-lg rounded-[4px] text-sm">
            커뮤니티 운영진 지원
          </button>
        )}
      </div>

      <div className=" flex flex-col gap-4 w-full">
        {/* 배너 */}
        <div className="w-full min-h-[160px] bg-blue-600 flex items-center justify-center text-white text-xl">
          배너 이미지
        </div>

        {modifyMode ? (
          <div></div>
        ) : (
          <div className=" flex gap-4">
            {/* ChampionshipList */}
            <div className="w-full">
              <h3 className="font-bold mb-2">Championship</h3>
              <ChampionshipList communityIdx={Number(communityIdx)} />
            </div>

            {/* BoardList */}
            {/* <div className="w-full">
            <h3 className="font-bold mb-2">Community Board</h3>
            <BoardList category={0} />
          </div> */}

            {/* CommunityTeamList */}
            <div className="w-full">
              <h3 className="font-bold mb-2">Community Teams</h3>
              <CommunityTeamList communityIdx={Number(communityIdx)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
