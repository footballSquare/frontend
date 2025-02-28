import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";
import PlayerDashBoard from "./ui/PlayerDashBoard";

const Profile = () => {
  const [userInfo] = useGetMyInfo();
  return (
    <main className="grid grid-cols-3 gap-4 w-full ">
      <div className="col-span-2">
        <PlayerDashBoard userInfo={userInfo} />
      </div>
      <div className="col-span-1 ">프로필 이미지</div>
    </main>
  );
};
export default Profile;
