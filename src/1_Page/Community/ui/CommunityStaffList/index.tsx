import useGetCommunityStaffList from "../../../../3_Entity/Community/useGetCommunityStaffList";
import { teamRole } from "../../../../4_Shared/constant/teamRole";
import useIsCommunityStaff from "./model/useIsCommunityStaff";

const CommunityStaffListPanel = (props: CommunityStaffListPanelProps) => {
  const { communityIdx } = props;
  const [communityStaffList] = useGetCommunityStaffList({ communityIdx });
  const [isCommunityStaff] = useIsCommunityStaff(communityStaffList);

  return (
    <div className="flex flex-col gap-4">
      <div>
        {communityStaffList.map((staff, index) => {
          return (
            <div
              key={index}
              className="flex items-center space-x-2 border border-gray p-2"
            >
              <img
                src={staff.player_list_profile_img ?? undefined}
                alt="Profile"
                className=" object-cover w-8 h-8 rounded-full overflow-hidden"
              />
              <div className="flex-1">
                <p className="text-sm">@{staff.player_list_nickname}</p>
              </div>
              <p className="text-xs text-gray-500">
                {teamRole[staff.community_role_idx]}
              </p>
            </div>
          );
        })}
      </div>

      {!isCommunityStaff && (
        <button className="p-3 border border-gray-300 shadow-md rounded-lg text-sm bg-green-500 text-white hover:bg-green-600 transition">
          커뮤니티 운영진 지원하기
        </button>
      )}
    </div>
  );
};

export default CommunityStaffListPanel;
