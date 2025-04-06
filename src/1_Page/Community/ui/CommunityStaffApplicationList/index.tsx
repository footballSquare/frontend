import useDeleteCommunityStaffApplication from "../../../../3_Entity/Community/useDeleteCommunityStaffApplication";
import useGetCommunityStaffApplicationList from "../../../../3_Entity/Community/useGetCommunityStaffApplicationList";
import usePostApproveCommunityStaffAppication from "../../../../3_Entity/Community/usePostApproveCommunityStaffAppication";

const CommunityStaffApplicationList = (
  props: CommunityStaffApplicationListProps
) => {
  const { communityIdx } = props;
  const [communityStaffApplicationList, setCommunityStaffApplicationList] =
    useGetCommunityStaffApplicationList({
      communityIdx
    });
  const [postApproveCommunityStaffApplication] =
    usePostApproveCommunityStaffAppication();
  const [deleteCommunityStaffApplication] =
    useDeleteCommunityStaffApplication();

  return (
    <div className="bg-gray-50 rounded-xl shadow-md w-full flex flex-col gap-4 p-4">
      {communityStaffApplicationList.map((application, index) => {
        return (
          <div
            key={index}
            className="flex items-center space-x-2 border border-gray p-2"
          >
            <img
              src={application.player_list_profile_img ?? undefined}
              alt="Profile"
              className=" object-cover w-8 h-8 rounded-full overflow-hidden"
            />
            <div className="flex-1">
              <p className="text-sm">@{application.player_list_nickname}</p>
            </div>
            <button
              onClick={() => {
                postApproveCommunityStaffApplication({
                  communityIdx,
                  userIdx: application.player_list_idx,
                });
                setCommunityStaffApplicationList((prev) =>
                  prev.filter(
                    (elem) =>
                      elem.player_list_idx !== application.player_list_idx
                  )
                );
              }}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200"
            >
              수락
            </button>
            <button
              onClick={() => {
                deleteCommunityStaffApplication({
                  communityIdx,
                  userIdx: application.player_list_idx,
                });
                setCommunityStaffApplicationList((prev) =>
                  prev.filter(
                    (elem) =>
                      elem.player_list_idx !== application.player_list_idx
                  )
                );
              }}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
            >
              거절
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityStaffApplicationList;
