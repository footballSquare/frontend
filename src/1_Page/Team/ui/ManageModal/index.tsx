import EmblemImageInput from "./ui/EmblemImageInput";
import BannerImageInput from "./ui/BannerImageInput";
import TextInputForm from "./ui/TextInputForm";
import TeamApplications from "./ui/TeamApplications";
import AutoMatchPanel from "./ui/AutoMatchPanel";
import default_banner from "../../../../4_Shared/assets/img/banner_soccer.jpg";

import useDeleteTeam from "../../../../3_Entity/Team/useDeleteTeam";

const ManageModal = (props: ManageModalProps) => {
  const { teamInfo, handleToggleManageModal, handlers } = props;
  const [deleteTeam] = useDeleteTeam(teamInfo.team_list_idx);

  return (
    <div className="fixed w-full z-10 bg-black bg-opacity-50  top-0 left-0 h-screen flex justify-center items-center">
      <main className="w-full p-4 bg-white  rounded-lg ">
        <div className="flex flex-row justify-between items-center bg-white border-b mb-6 ">
          {/* 타이틀 영역 */}
          <div className="mr-6">
            <h2 className="text-blue-600 font-semibold tracking-wider text-2xl">
              TEAM MANAGEMENT
            </h2>
            <h1 className="text-gray-800 font-bold text-4xl">TEAM DETAILS</h1>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex space-x-2">
            <button
              onClick={() => {
                if (confirm("정말로 해체하시겠습니까?")) {
                  deleteTeam();
                }
              }}
              type="button"
              aria-label="팀 해체"
              className="flex items-center py-1.5 px-3 bg-white border border-red-500 text-red-500 rounded hover:bg-red-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-200 text-sm font-medium">
              <i className="fas fa-trash-alt mr-1.5 text-xs"></i>팀 해체
            </button>

            <button
              onClick={handleToggleManageModal}
              type="button"
              aria-label="뒤로가기"
              className="flex items-center py-1.5 px-3 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm font-medium">
              <i className="fas fa-arrow-left mr-1.5 text-xs"></i>뒤로가기
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Team Banner */}
          <BannerImageInput
            team_list_idx={teamInfo.team_list_idx}
            imgSrc={teamInfo.team_list_banner || default_banner}
            handleSetBanner={handlers.handleSetTeamBanner}
          />

          {/* Team Emblem */}
          <section className="flex justify-start items-center space-x-4">
            <EmblemImageInput
              team_list_idx={teamInfo.team_list_idx}
              imgSrc={teamInfo.team_list_emblem || default_banner}
              handleSetTeamEmblem={handlers.handleSetTeamEmblem}
            />
            <AutoMatchPanel />
          </section>

          <section className="flex flex-wrap w-full gap-3">
            <TextInputForm
              team_list_idx={teamInfo.team_list_idx}
              teamInfo={teamInfo}
              handleSetTeamInfoWithoutImg={handlers.handleSetTeamInfoWithoutImg}
            />
            <TeamApplications team_list_idx={teamInfo.team_list_idx} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default ManageModal;
