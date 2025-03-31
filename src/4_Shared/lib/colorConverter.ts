export const convertHexToRGBA = (team_list_color: string) => {
  const teamColor = team_list_color || "#EEEEEE";
  const teamBgColor = `rgba(${parseInt(teamColor.slice(1, 3), 16)}, ${parseInt(
    teamColor.slice(3, 5),
    16
  )}, ${parseInt(teamColor.slice(5, 7), 16)}, 0.1)`;
  const teamBorderColor = `rgba(${parseInt(
    teamColor.slice(1, 3),
    16
  )}, ${parseInt(teamColor.slice(3, 5), 16)}, ${parseInt(
    teamColor.slice(5, 7),
    16
  )}, 0.3)`;
  return { teamColor, teamBgColor, teamBorderColor };
};
