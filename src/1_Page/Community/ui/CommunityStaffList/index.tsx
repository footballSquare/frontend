import { useNavigate } from "react-router-dom";
import useDeleteCommunityStaff from "../../../../3_Entity/Community/useDeleteCommunityStaff";
import useGetCommunityStaffList from "../../../../3_Entity/Community/useGetCommunityStaffList";
import usePostApplyCommunityStaff from "../../../../3_Entity/Community/usePostApplyCommunityStaff";
import { communityRole } from "../../../../4_Shared/constant/communityRole";
import useIsCommunityStaff from "./model/useIsCommunityStaff";
import { useIsLogin } from "../../../../4_Shared/lib/useMyInfo";

const CommunityStaffListPanel = (props: CommunityStaffListPanelProps) => {
  const { communityIdx, modifyMode } = props;
  const [communityStaffList, setCommunityStaffList] = useGetCommunityStaffList({
    communityIdx,
  });
  const [isCommunityStaff] = useIsCommunityStaff(communityStaffList);
  const [postApplyCommunityStaff] = usePostApplyCommunityStaff();
  const [kickCommunityStaff] = useDeleteCommunityStaff();
  const navigate = useNavigate();
  const [isLogin] = useIsLogin();

  return (
    <div className="flex flex-col gap-2">
      <div>
        {communityStaffList.map((staff, index) => {
          return (
            <div
              key={index}
              className="flex items-center space-x-2 border border-gray p-2 cursor-pointer hover:bg-grass hover:text-black rounded-lg"
              onClick={() => {
                navigate(`/profile/${staff.player_list_idx}`);
              }}
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
                {communityRole[staff.community_role_idx]}
              </p>
              {modifyMode && staff.community_role_idx !== 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    kickCommunityStaff({
                      communityIdx,
                      userIdx: staff.player_list_idx,
                    });
                    setCommunityStaffList((prev) =>
                      prev.filter(
                        (elem) => elem.player_list_idx !== staff.player_list_idx
                      )
                    );
                  }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  추방
                </button>
              )}
            </div>
          );
        })}
      </div>

      {(!isCommunityStaff && isLogin) && (
        <button
          onClick={() => {
            postApplyCommunityStaff({ communityIdx });
          }}
          className="p-3 border border-gray-300 shadow-md rounded-lg text-sm bg-green-500 text-white hover:bg-green-600 transition"
        >
          커뮤니티 운영진 지원하기
        </button>
      )}
    </div>
  );
};

export default CommunityStaffListPanel;
