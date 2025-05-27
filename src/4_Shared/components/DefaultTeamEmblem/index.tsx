const DefaultTeamEmblem = (props: DefaultTeamEmblemProps) => {
  const {
    team_list_color = "#3182f6",
    team_list_short_name = "팀",
    width = 48,
    height = 48,
  } = props;

  return (
    <div
      className={`rounded-full mr-3 flex items-center justify-center text-white font-bold text-lg`}
      style={{
        backgroundColor: team_list_color,
        width: `${width}px`,
        height: `${height}px`,
      }}>
      {team_list_short_name.slice(0, 3)}
    </div>
  );
};

export default DefaultTeamEmblem;
