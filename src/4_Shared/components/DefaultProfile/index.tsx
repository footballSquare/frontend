const DefaultProfile = (props: DefaultProfileProps) => {
  const {
    src = null,
    alt = "프로필 이미지",
    width,
    height,
    textSize,
    className = "",
    nickname = "",
  } = props;

  const displayText = nickname ? nickname.substring(0, 2) : "?";

  // 프로필 이미지가 없으면 기본 아바타 표시
  return src ? (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
        fontSize: textSize,
      }}
      className={`rounded-full border border-gray-600 object-cover ${className}`}
    />
  ) : (
    <div
      style={{
        width,
        height,
        fontSize: textSize,
      }}
      className={`bg-gray-700 rounded-full flex items-center justify-center border border-gray-600 ${className}`}>
      <span
        className="font-medium text-gray-300"
        style={{ fontSize: textSize }}>
        {displayText}
      </span>
    </div>
  );
};

export default DefaultProfile;
