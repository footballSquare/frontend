const EmptyBanner = (props: EmptyBannerProps) => {
  const {
    text,
    height = "h-[200px]",
    gradientFrom = "from-blue-500",
    gradientTo = "to-green-500",
    textSize = "text-2xl sm:text-3xl",
    className = "",
    children,
  } = props;

  return (
    <div
      className={`w-full ${height} rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center text-white ${textSize} font-bold shadow-md ${className}`}>
      {text || children}
    </div>
  );
};

export default EmptyBanner;
