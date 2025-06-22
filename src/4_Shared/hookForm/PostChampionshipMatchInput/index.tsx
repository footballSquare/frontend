const PostChampionshipMatchInput = (props: PostChampionshipMatchInputProps) => {
  const {
    registerType,
    register,
    formState: { errors },
  } = props;
  return (
    <div>
      {registerType === "teamList" && errors.teams && (
        <p className="text-red-500 text-sm mt-1">
          {(errors.teams as { message?: string })?.message}
        </p>
      )}

      {registerType === "matchDate" && (
        <div className="mb-4">
          <label>매치 진행 일 선택</label>
          <input
            type="date"
            {...register("matchDate")}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.matchDate && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.matchDate as { message?: string })?.message}
            </p>
          )}
        </div>
      )}
      {registerType === "startTime" && (
        <div className="mb-4">
          <label>매치 시작 시 각 선택</label>
          <select
            {...register("startTime")}
            className="w-full p-2 border border-gray-300 rounded mt-1">
            {Array.from({ length: 48 }, (_, i) => {
              const hour = Math.floor(i / 2);
              const minutes = (i % 2) * 30;
              const hourString = hour.toString().padStart(2, "0");
              const minuteString = minutes.toString().padStart(2, "0");
              return (
                <option
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black dark:bg-black dark:text-white"
                  key={i}
                  value={`${hourString}:${minuteString}`}>
                  {`${hourString}:${minuteString}`}
                </option>
              );
            })}
          </select>
          {errors.startTime && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.startTime as { message?: string })?.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostChampionshipMatchInput;
