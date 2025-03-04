import useMakeTeamMatchModalStore from "../../../../4_Shared/zustand/useMakeTeamMatchModal";

const LeaderMatchButton = () => {
  const { setToggleModal } = useMakeTeamMatchModalStore();

  return (
    <div className="flex gap-2">
      <button className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full">
        팀관리
      </button>
      <button
        className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full cursor-auto"
        onClick={() => {
          setToggleModal();
        }}>
        매치 생성
      </button>
      {/* 매치 생성 모달 */}
    </div>
  );
};

export default LeaderMatchButton;
