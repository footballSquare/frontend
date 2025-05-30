import useGetRepeatTeams from "./model/useGetRepeatTeams";

const TeamRepeatProvider = (props: RepeatProviderProps) => {
  const { children, isShort } = props;

  const [handleTeamNameCheck] = useGetRepeatTeams(isShort);

  return (
    <div className="flex items-center gap-2">
      {children}
      <button
        type="button"
        onClick={handleTeamNameCheck}
        className="bg-grass/30
        min-w-[100px] hover:bg-grass/80
        text-white text-sm px-3 py-2 rounded transition-colors">
        중복확인
      </button>
    </div>
  );
};

export default TeamRepeatProvider;
