import { useNavigate, useParams } from "react-router-dom";
import ChampionshipList from "./ui/ChampionShipList";
import CommunityStaffList from "./ui/CommunityStaffList";
import CommunityTeamList from "../../2_Widget/CommunityTeamList";
import useModifyMode from "./model/useModifyMode";
import useGetCommunityInfo from "../../3_Entity/Community/useGetCommunityInfo";
import CommunityStaffApplicationList from "./ui/CommunityStaffApplicationList";
import CommunityTeamApplicationList from "./ui/CommunityTeamApplicationList";
import useChangeEmblem from "./model/useChangeEmblem";
import useChangeBanner from "./model/useChangeBanner";
import { useMyCommunityRoleIdx } from "../../4_Shared/lib/useMyInfo";
import useIsCommunityStaffStore from "../../4_Shared/zustand/useIsCommunityStaffStore";
import CommunityNotice from "./ui/CommunityNotice";

const Community = () => {
  const { communityIdx } = useParams();
  const [modifyMode, toggleModifyMode] = useModifyMode();
  const [communityInfo, loading, setCommunityInfo] = useGetCommunityInfo({
    communityIdx: Number(communityIdx),
  });
  const [changeEmblem] = useChangeEmblem({
    setCommunityInfo,
  });
  const [changeBanner] = useChangeBanner({
    setCommunityInfo,
  });
  const { isCommunityStaff } = useIsCommunityStaffStore();
  const [communityRoleIdx] = useMyCommunityRoleIdx();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full p-6 flex gap-6">
      {/* Left Sidebar */}
      <div className="flex flex-col h-[100vh] gap-6 bg-white rounded-xl shadow-md p-6 w-full max-w-[320px] overflow-auto">
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

          <CommunityNotice
            communityIdx={Number(communityIdx)}
            content={communityInfo.community_list_notice}
            modifyMode={modifyMode}
          />
        </div>
        {/* 배너&엠블럼 수정 버튼 */}
        {modifyMode && (
          <div className="flex flex-col gap-4 mx-auto">
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                커뮤니티 엠블럼 변경 하기
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    changeEmblem({
                      communityIdx: Number(communityIdx),
                      emblem: file,
                    });
                  }
                }}
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                커뮤니티 배너 변경 하기
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    changeBanner({
                      communityIdx: Number(communityIdx),
                      banner: file,
                    });
                  }
                }}
                className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* 커뮤니티 운영진 목록 & 운영진 지원 */}
        <CommunityStaffList
          communityIdx={Number(communityIdx)}
          modifyMode={modifyMode}
        />

        {/* 커뮤니티 수정 버튼 */}
        {communityRoleIdx === 0 && (
          <button
            className="p-3 border border-gray-300 shadow-md rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 transition"
            onClick={toggleModifyMode}
          >
            {modifyMode ? "뒤로 가기" : "커뮤니티 관리"}
          </button>
        )}
        {/* 대회 생성 버튼 */}
        {isCommunityStaff && (
          <button
            onClick={() => {
              navigate(`/championship-edit/add/${communityIdx}`);
            }}
            className="p-3 border border-gray-300 shadow-md rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            대회 생성하기
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6 w-full">
        {/* 배너 */}
        <img
          src={communityInfo.community_list_banner}
          alt="배너"
          className="w-full min-h-[190px] bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold rounded-lg shadow-md"
        />

        <div className="flex gap-6 max-h-[80%]">
          {modifyMode ? (
            <>
              {/* CommunityTeamList */}
              <div className="w-full">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                  Community Teams
                </h3>
                <CommunityTeamList
                  communityIdx={Number(communityIdx)}
                  modifyMode={true}
                />
              </div>

              {/* 가입 신청 팀 목록 */}
              <div className="w-full">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                  Join Requests
                </h3>
                <CommunityTeamApplicationList
                  communityIdx={Number(communityIdx)}
                />
              </div>

              {/* 운영진 가입 신청 유저 목록 */}
              <div className="w-full">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                  Staff Join Requests
                </h3>
                <CommunityStaffApplicationList
                  communityIdx={Number(communityIdx)}
                />
              </div>
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
                  modifyMode={false}
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
