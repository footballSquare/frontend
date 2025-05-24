const TeamNameRepeatProvider = (props: TeamNameRepeatProviderProps) => {
  const { getRepeatCheck, children } = props;

  return (
    <div className="flex gap-2 items-center">
      {children}
      <button
        type="button"
        className="py-2 px-4 text-sm font-semibold text-white bg-grass rounded-md hover:bg-grass/80 transition">
        중복 확인
      </button>
    </div>
  );
};

export default TeamNameRepeatProvider;
