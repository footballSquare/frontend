import useGetCommunityStaffList from "../../../../3_Entity/Community/useGetCommunityStaffList";
import { teamRole } from "../../../../4_Shared/constant/teamRole";

const CommunityAdminList = (props: CommunityAdminListProps) => {
  const { communityIdx } = props;
  const [communityStaffList] = useGetCommunityStaffList({ communityIdx });

  return (
    <div className="space-y-3 border-1">
      {communityStaffList.map((staff) => {
        return (
          <div className="flex items-center space-x-2">
            <img
              src={staff.player_list_profile_img}
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
  );
};

export default CommunityAdminList;
