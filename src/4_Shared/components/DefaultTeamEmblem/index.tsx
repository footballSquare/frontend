const DefaultTeamEmblem = (props: DefaultTeamEmblemProps) => {
  const { bgColor = "#3182f6", text = "팀" } = props;

  return (
    <div
      className={`w-full h-full rounded-full flex items-center justify-center text-white font-bold text-lg`}
      style={{
        backgroundColor: bgColor,
      }}>
      {text}
    </div>
  );
};

export default DefaultTeamEmblem;
