import useGetRepeatTeams from "./model/useGetRepeatTeams";

const TeamNameRepeatProvider = (props: TeamNameRepeatProviderProps) => {
  const { children, isShort, modifyMode, beforeName } = props;

  const [handleTeamNameCheck] = useGetRepeatTeams({ isShort, beforeName });

  return (
    <div className="flex gap-2 items-center mb-3">
      {children}
      <button
        disabled={!modifyMode}
        onClick={handleTeamNameCheck}
        type="button"
        className={`py-2 px-4 text-sm min-w-[100px] font-semibold text-white rounded-md transition ${
          modifyMode
            ? "bg-grass hover:bg-grass/80"
            : "bg-gray-400 opacity-50 cursor-not-allowed"
        }`}>
        중복 확인
      </button>
    </div>
  );
};

export default TeamNameRepeatProvider;
