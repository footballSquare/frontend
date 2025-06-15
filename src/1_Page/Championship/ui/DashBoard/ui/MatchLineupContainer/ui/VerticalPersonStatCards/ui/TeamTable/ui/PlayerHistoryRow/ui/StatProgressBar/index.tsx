const StatProgressBar = (props: StatProgressBarProps) => {
  const {
    value,
    max = 100,
    showPercentage = true,
    color = "bg-grass",
    height = "h-2",
  } = props;
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="flex items-center space-x-3">
      <div className={`flex-1 bg-gray-700 rounded-full ${height}`}>
        <div
          className={`${color} ${height} rounded-full transition-all duration-300`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
      {showPercentage && (
        <span className="text-sm font-semibold text-gray-100 min-w-[3rem]">
          {value}%
        </span>
      )}
    </div>
  );
};

export default StatProgressBar;
