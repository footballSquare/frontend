import { ManagePageProps } from "./type";

import EmblemImageInput from "./ui/EmblemImageInput";
import BannerImageInput from "./ui/BannerImageInput";
import TextInputForm from "./ui/TextInputForm";
import TeamApplications from "./ui/TeamApplications";
import AutoMatchModalBtn from "./ui/AutoMatchModalBtn";

import useDeleteTeam from "../../../../3_Entity/Team/useDeleteTeam";

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
    handleTogglePage,
  } = props;

  const teamTextInputInfo = {
    team_list_idx,
    team_list_name,
    team_list_short_name,
    team_list_color,
    team_list_announcement,
    common_status_idx,
  };

  const [deleteEvent] = useDeleteTeam(team_list_idx);

  return (
    <main className="w-full p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-blue-600 font-semibold text-center text-sm">
        TEAM MANAGEMENT
      </h2>
      <h1 className="text-lg font-bold text-center mt-1">TEAM DETAILS</h1>
      <div className="space-y-6">
        {/* Team Banner */}
        <BannerImageInput
          team_list_idx={team_list_idx}
          imgSrc={team_list_banner}
        />

        {/* Team Emblem */}
        <section className="flex justify-start items-center space-x-4">
          <EmblemImageInput
            team_list_idx={team_list_idx}
            imgSrc={team_list_emblem}
          />
          <AutoMatchModalBtn />
        </section>

        <section className="flex flex-wrap w-full gap-3">
          <TextInputForm {...teamTextInputInfo} />
          <TeamApplications team_list_idx={team_list_idx} />
        </section>

        <footer className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => {
              if (confirm("정말로 해체하시겠습니까?")) {
                deleteEvent();
              }
            }}
            type="button"
            className="py-2 px-6 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500">
            팀 해체
          </button>

          <button
            onClick={handleTogglePage}
            type="button"
            className="py-2 px-6 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
            뒤로가기
          </button>
        </footer>
      </div>
    </main>
  );
};

export default ManagePage;
