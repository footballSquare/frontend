import { useNavigate, useParams } from "react-router-dom";
import ChampionshipList from "./ui/ChampionShipList";
import CommunityStaffList from "./ui/CommunityStaffList";
import CommunityTeamList from "./ui/CommunityTeamList";
import useModifyMode from "./model/useModifyMode";
import useGetCommunityInfo from "../../3_Entity/Community/useGetCommunityInfo";
import CommunityStaffApplicationList from "./ui/CommunityStaffApplicationList";
import CommunityTeamApplicationList from "./ui/CommunityTeamApplicationList";
import useChangeEmblem from "./model/useChangeEmblem";
import useChangeBanner from "./model/useChangeBanner";
import { useMyTeamRoleIdx } from "../../4_Shared/lib/useMyInfo";
import CommunityNotice from "./ui/CommunityNotice";
import usePostApplyCommunityTeam from "../../3_Entity/Community/usePostApplyCommunityTeam";
import CommunityBoardList from "./ui/CommunityBoardList";
import useCommunityIdx from "./model/useCommunityIdx";
import Banner from "./ui/Banner";
import useCommunityStaffInfo from "./model/useCommunityStaffInfo";
import SlidingButton from "../../4_Shared/components/SlidingButton";
import useCommunityTab from "./model/useCommunityTab";

const Community = () => {
  const { communityIdx } = useParams();
  const [modifyMode, toggleModifyMode] = useModifyMode(Number(communityIdx));
  const [communityInfo, loading, setCommunityInfo] = useGetCommunityInfo({
    communityIdx: Number(communityIdx),
  });

  const [changeEmblem] = useChangeEmblem({
    setCommunityInfo,
  });
  const [changeBanner] = useChangeBanner({
    setCommunityInfo,
  });
  const [isCommunityStaff, communityRoleIdx] = useCommunityStaffInfo({
    communityIdx: Number(communityIdx),
  });
  const navigate = useNavigate();
  const [myTeamRoleIdx] = useMyTeamRoleIdx();
  const [postApplyCommunityTeam] = usePostApplyCommunityTeam();
  useCommunityIdx({
    currentCommunityIdx: Number(communityIdx),
  });

  const [tab, setCommunityTab] = useCommunityTab();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full p-8 flex flex-col gap-6 items-center">
      {/* 커뮤니티 정보 + 관리 버튼 + 운영진 지원 버튼 */}
      <div className="flex flex-col gap-2 bg-gray-800 lg:w-[50%] w-full text-white rounded-xl shadow-md p-6">
        {/* 커뮤니티 앰블럼, 커뮤니티 명, 커뮤니티 공지 */}
        <div className="flex flex-col items-center">
          {/* 앰블럼 */}
          <img
            src={communityInfo.community_list_emblem}
            alt="emblem"
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl mb-4 shadow-lg"
          />
          {/* 커뮤니티 명 */}
          <h2 className="text-2xl font-semibold">
            {communityInfo.community_list_name}
          </h2>
          {/* 커뮤니티 공지 */}
          <CommunityNotice
            communityIdx={Number(communityIdx)}
            content={communityInfo.community_list_notice}
            modifyMode={modifyMode}
          />
        </div>

        {/* 엠블럼&배너 수정 버튼 (수정 모드에서 출력) */}
        {modifyMode && isCommunityStaff && communityRoleIdx === 0 && (
          <div className="flex flex-col gap-4 mx-auto">
            {/* 엠블럼 수정 */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium mb-2">
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
            {/* 배너 수정 */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium mb-2">
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
          isCommunityStaff={isCommunityStaff}
        />
        {/* 커뮤니티 수정 모드 전환 버튼 */}
        {isCommunityStaff && communityRoleIdx === 0 && (
          <SlidingButton
            onClickHandler={toggleModifyMode}
            text={modifyMode ? "뒤로 가기" : "커뮤니티 관리"}
          />
        )}
        {/* 커뮤니티 글 작성 버튼 */}
        {isCommunityStaff && communityRoleIdx === 0 && (
          <SlidingButton
            onClickHandler={() => {
              navigate("/post/write/new/community");
            }}
            text="커뮤니티 글 작성"
          />
        )}
        {/* 대회 생성 버튼 */}
        {isCommunityStaff && (
          <SlidingButton
            onClickHandler={() => {
              navigate(`/championship-edit/add/${communityIdx}`);
            }}
            text="대회 생성하기"
          />
        )}
        {/* 커뮤니티 팀 가입 신청 버튼 */}
        {myTeamRoleIdx === 0 && (
          <SlidingButton
            onClickHandler={() => {
              postApplyCommunityTeam({ communityIdx: Number(communityIdx) });
            }}
            text="커뮤니티 팀 가입 신청하기"
          />
        )}
      </div>

      <div className="flex flex-col gap-[56px] w-full">
        {/* 배너 */}
        <Banner bannerImg={communityInfo.community_list_banner} />
        {/* 커뮤니티 팀 목록, 커뮤니티 글 목록, 대회 목록 */}
        <div className="flex gap-6 max-h-[80%] mb-4">
          {/* 수정 모드 (팀 지원 승인/거정, 운영진 지원 승인/거절, 팀 관리) */}
          {modifyMode && isCommunityStaff && communityRoleIdx === 0 ? (
            <div className="flex flex-col gap-[44px] md:flex-row w-full">
              {/* CommunityTeamList */}
              <div className="w-full">
                <h3 className="font-semibold text-lg text-gray">
                  Community Teams
                </h3>
                <CommunityTeamList
                  communityIdx={Number(communityIdx)}
                  modifyMode={true}
                />
              </div>

              {/* 가입 신청 팀 목록 */}
              <div className="w-full border">
                <h3 className="font-semibold text-lg text-gray">
                  Community Team Join Requests
                </h3>
                <CommunityTeamApplicationList
                  communityIdx={Number(communityIdx)}
                />
              </div>

              {/* 운영진 가입 신청 유저 목록 */}
              <div className="w-full">
                <h3 className="font-semibold text-lg text-gray">
                  Staff Join Requests
                </h3>
                <CommunityStaffApplicationList
                  communityIdx={Number(communityIdx)}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 w-full h-[500px]">
              {/* 탭 전환 버튼 */}
              <div className="flex gap-2 flex-col md:gap-0 md:flex-row w-full text-white">
                <button onClick={() => { setCommunityTab({ newTab: "championship" }); }} className="bg-gray-800 w-full h-[36px] md:h-[48px] hover:bg-grass hover:opacity-30 duration-300 hover:text-black rounded-lg md:rounded-[0]">Championship</button>
                <button onClick={() => { setCommunityTab({ newTab: "boards" }); }} className="bg-gray-800 w-full h-[36px] md:h-[48px] hover:bg-grass hover:opacity-30 duration-300 hover:text-black rounded-lg md:rounded-[0]">Board</button>
                <button onClick={() => { setCommunityTab({ newTab: "teamList" }); }} className="bg-gray-800 w-full h-[36px] md:h-[48px] hover:bg-grass hover:opacity-30 duration-300 hover:text-black rounded-lg md:rounded-[0]">Community Teams</button>
              </div>

              <div className="flex items-center justify-center w-full">
                {/* ChampionshipList */}
                {tab === "championship" && (
                  <div className="w-full animate-fade-in-scale">
                    <h3 className={`font-semibold text-lg text-gray mb-4`}>
                      Championship
                    </h3>
                    <ChampionshipList communityIdx={Number(communityIdx)} />
                  </div>
                )}
                {/* boardList */}
                {tab === "boards" && (
                  <div className="w-full animate-fade-in-scale">
                    <h3 className="font-semibold text-lg text-gray mb-4">
                      Board
                    </h3>
                    <CommunityBoardList communityIdx={Number(communityIdx)} />
                  </div>
                )}
                {/* teamList */}
                {tab === "teamList" && (
                  <div className="w-full animate-fade-in-scale">
                    <h3 className="font-semibold text-lg text-gray mb-4">
                      Community Teams
                    </h3>
                    <CommunityTeamList
                      communityIdx={Number(communityIdx)}
                      modifyMode={false}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
