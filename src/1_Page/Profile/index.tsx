import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";

const Profile = () => {
  const [userInfo] = useGetMyInfo();
  return (
    <main className="grid grid-cols-3 gap-4 w-full ">
      <div className="col-span-2 flex justify-center items-center ">
        <div className="w-[180px] sm:w-[150px] md:w-[200px] lg:w-[250px] aspect-[3/4] bg-blue-900 text-white rounded-xl flex flex-col items-center justify-between p-4 shadow-lg">
          {/* 포지션 */}
          <div className="text-sm font-bold self-start">RW</div>

          {/* 선수 이미지 */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="https://example.com/player.png"
              alt="Player"
              className="max-w-[80%] max-h-[60%] object-contain"
            />
          </div>

          {/* 선수 정보 */}
          <div className="text-center">
            <p className="text-lg font-semibold">김네이마루 #KOR</p>
            <p className="text-sm">10번</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 ">프로필 이미지</div>
    </main>
  );
};
export default Profile;
