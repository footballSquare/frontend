const StatProgressBar = (props: StatProgressBarProps) => {
  const { label, percentage } = props;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="font-medium text-gray-100">
          {percentage.toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-grass h-2 rounded-full"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};
export default StatProgressBar;
