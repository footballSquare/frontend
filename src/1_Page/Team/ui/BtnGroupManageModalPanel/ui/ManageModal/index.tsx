import TeamImageInput from "./ui/TeamImageInput";
import TextInputForm from "./ui/TextInputForm";
import TeamApplications from "./ui/TeamApplications";
import AutoMatchPanel from "./ui/AutoMatchPanel";

import useDeleteTeam from "../../../../../../3_Entity/Team/useDeleteTeam";
import usePutTeamBanner from "../../../../../../3_Entity/Team/usePutTeamBanner";
import usePutTeamEmblem from "../../../../../../3_Entity/Team/usePutTeamEmblem";

import deleteIcon from "../../../../../../4_Shared/assets/svg/delete.svg";
import backIcon from "../../../../../../4_Shared/assets/svg/back.svg";
import bannerIcon from "../../../../../../4_Shared/assets/svg/banner.svg";
import emblemIcon from "../../../../../../4_Shared/assets/svg/emblem.svg";
import autoMatchIcon from "../../../../../../4_Shared/assets/svg/auto-match.svg";
import editIcon from "../../../../../../4_Shared/assets/svg/edit.svg";
import applicationsIcon from "../../../../../../4_Shared/assets/svg/application.svg";

const ManageModal = (props: ManageModalProps) => {
  const { teamInfo, handleToggleManageModal, handlers } = props;
  const [deleteTeam] = useDeleteTeam(teamInfo.team_list_idx);
  const [putTeamBanner] = usePutTeamBanner(teamInfo.team_list_idx);
  const [putTeamEmblem] = usePutTeamEmblem(teamInfo.team_list_idx);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center items-center">
      <main className="w-[95%] max-w-6xl max-h-[90%] overflow-auto bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-t-xl border-b border-gray-700 flex flex-row justify-between items-center sticky top-0 z-10 backdrop-filter backdrop-blur">
          {/* 타이틀 영역 */}
          <div className="mr-6">
            <h2 className="text-grass font-semibold tracking-wider text-lg uppercase mb-1">
              Team Management
            </h2>
            <h1 className="text-gray-100 font-bold text-3xl flex items-center">
              {teamInfo.team_list_name}
              <span className="ml-3 px-2 py-1 bg-gray-800 text-xs text-gray-400 rounded-md border border-gray-700">
                ID: {teamInfo.team_list_idx}
              </span>
            </h1>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex space-x-3">
            <button
              onClick={() => {
                if (
                  confirm(
                    "정말로 팀을 해체하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                  )
                ) {
                  deleteTeam();
                }
              }}
              type="button"
              aria-label="팀 해체"
              className="flex items-center py-2 px-4 bg-gray-800 text-red-500 rounded-lg hover:bg-red-900 hover:text-red-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm font-medium border border-red-800 shadow-md">
              <img src={deleteIcon} alt="팀 해체" className="h-4 w-4 mr-2" />팀
              해체
            </button>

            <button
              onClick={handleToggleManageModal}
              type="button"
              aria-label="뒤로가기"
              className="flex items-center py-2 px-4 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-sm font-medium border border-gray-700 shadow-md">
              <img src={backIcon} alt="닫기" className="h-4 w-4 mr-2" />
              닫기
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Team Banner */}
          <section className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-md">
            <h3 className="text-gray-300 font-semibold mb-4 flex items-center">
              <img src={bannerIcon} alt="팀 배너" className="h-5 w-5 mr-2" />팀
              배너
            </h3>
            <TeamImageInput
              label="팀 배너"
              placeholderText="배너 이미지를 업로드하세요"
              width="w-full"
              height="h-[140px]"
              initialSrc={teamInfo.team_list_banner}
              putImage={putTeamBanner}
              handleChangePreview={handlers.handleSetTeamBanner}
            />
          </section>

          {/* Team Emblem & Auto Match */}
          <section className="flex flex-col md:flex-row gap-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-md flex-1">
              <h3 className="text-gray-300 font-semibold mb-4 flex items-center">
                <img
                  src={emblemIcon}
                  alt="팀 엠블럼"
                  className="h-5 w-5 mr-2"
                />
                팀 엠블럼
              </h3>
              <TeamImageInput
                label="팀 엠블럼"
                placeholderText="엠블럼 이미지를 업로드하세요"
                width="w-20"
                height="h-20"
                initialSrc={teamInfo.team_list_emblem}
                putImage={putTeamEmblem}
                handleChangePreview={handlers.handleSetTeamEmblem}
              />
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-md flex-1">
              <h3 className="text-gray-300 font-semibold mb-4 flex items-center">
                <img
                  src={autoMatchIcon}
                  alt="자동 매치"
                  className="h-5 w-5 mr-2"
                />
                자동 매치
              </h3>
              <AutoMatchPanel />
            </div>
          </section>

          {/* Team Details & Applications */}
          <section className="flex flex-col lg:flex-row gap-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-md flex-1">
              <h3 className="text-gray-300 font-semibold mb-4 flex items-center">
                <img
                  src={editIcon}
                  alt="팀 정보 편집"
                  className="h-5 w-5 mr-2"
                />
                팀 정보 편집
              </h3>
              <TextInputForm
                team_list_idx={teamInfo.team_list_idx}
                teamInfo={teamInfo}
                handleSetTeamInfoPreview={handlers.handleSetTeamInfoWithoutImg}
              />
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-md flex-1">
              <h3 className="text-gray-300 font-semibold mb-4 flex items-center">
                <img
                  src={applicationsIcon}
                  alt="가입 신청"
                  className="h-5 w-5 mr-2"
                />
                가입 신청
              </h3>
              <TeamApplications team_list_idx={teamInfo.team_list_idx} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ManageModal;
