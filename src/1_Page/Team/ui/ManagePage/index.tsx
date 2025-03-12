import EmblemImageInput from "./ui/EmblemImageInput";
import BannerImageInput from "./ui/BannerImageInput";
import TextInputForm from "./ui/TextInputForm";
import { ManagePageProps } from "./type";
import TeamApplications from "./ui/TeamApplications";

const ManagePage = (props: ManagePageProps) => {
  const {
    teamInfo: {
      team_list_idx,
      team_list_name,
      team_list_short_name,
      team_list_color,
      team_list_emblem,
      team_list_banner,
      team_list_announcement,
      common_status_idx,
    },
    handleMoveTeamPage,
  } = props;

  const teamTextInputInfo = {
    team_list_idx,
    team_list_name,
    team_list_short_name,
    team_list_color,
    team_list_announcement,
    common_status_idx,
  };

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-blue-600 font-semibold text-center text-sm">
        TEAM MANAGEMENT
      </h2>
      <h1 className="text-lg font-bold text-center mt-1">TEAM DETAILS</h1>
      <div className="space-y-6">
        {/* Team Banner */}
        <div className="relative">
          <BannerImageInput
            team_list_idx={team_list_idx}
            imgSrc={team_list_banner}
          />
        </div>

        {/* Team Emblem */}
        <div className="flex justify-start items-center space-x-4">
          <EmblemImageInput
            team_list_idx={team_list_idx}
            imgSrc={team_list_emblem}
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-700">Team Info</h2>
            <p className="text-sm text-gray-500">
              Edit or update team details below.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap w-full gap-3">
          <TextInputForm {...teamTextInputInfo} />
          <TeamApplications />
        </div>

        {/* Back Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleMoveTeamPage}
            type="button"
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md">
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePage;
