import { useNavigate } from "react-router-dom";
import useDeleteCommunityStaff from "../../../../3_Entity/Community/useDeleteCommunityStaff";
import useGetCommunityStaffList from "../../../../3_Entity/Community/useGetCommunityStaffList";
import usePostApplyCommunityStaff from "../../../../3_Entity/Community/usePostApplyCommunityStaff";
import { communityRole } from "../../../../4_Shared/constant/communityRole";
import { useIsLogin } from "../../../../4_Shared/lib/useMyInfo";
import SlidingButton from "../../../../4_Shared/components/SlidingButton";

const CommunityStaffListPanel = (props: CommunityStaffListPanelProps) => {
  const { communityIdx, modifyMode, isCommunityStaff } = props;
  const [communityStaffList, setCommunityStaffList] = useGetCommunityStaffList({
    communityIdx,
  });
  const [postApplyCommunityStaff] = usePostApplyCommunityStaff();
  const [kickCommunityStaff] = useDeleteCommunityStaff();
  const navigate = useNavigate();
  const [isLogin] = useIsLogin();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        {/* 커뮤니티 운영진 목록 */}
        {communityStaffList.map((staff, index) => {
          return (
            <div
              key={index}
              className="flex items-center space-x-2 border border-gray p-2 cursor-pointer hover:bg-gray-900 rounded-lg hover:scale-[1.01] duration-300"
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
                <p className="text-xs">@{staff.player_list_nickname}</p>
              </div>
              <p className="text-xs text-white">
                {communityRole[staff.community_role_idx]}
              </p>
              {/* 수정모드 */}
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

      {!isCommunityStaff && isLogin && (
        <SlidingButton
          onClickHandler={() => {
            postApplyCommunityStaff({ communityIdx });
          }}
          text="커뮤니티 운영진 지원하기"
        />
      )}
    </div>
  );
};

export default CommunityStaffListPanel;
