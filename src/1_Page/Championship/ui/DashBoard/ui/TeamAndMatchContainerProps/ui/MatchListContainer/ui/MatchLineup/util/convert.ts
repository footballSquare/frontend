import { formation } from "../../../../../../../../../../../4_Shared/constant/formation";
import { formationCoordinateMap } from "../constant/lineup";

export const convertMatchFormation = (
  championshipDetail: ChampionshipDetail
): MatchFormationResult => {
  if (!championshipDetail) return { assignedFirst: [], assignedSecond: [] };

  const firstTeamPlayers = championshipDetail?.first_team?.player_stats || [];
  const secondTeamPlayers = championshipDetail?.second_team?.player_stats || [];

  const firstTeamFormation = formation[
    championshipDetail?.first_team?.team_formation_idx
  ] as keyof typeof formationCoordinateMap;
  const secondTeamFormation = formation[
    championshipDetail?.second_team?.team_formation_idx
  ] as keyof typeof formationCoordinateMap;

  const firstCoord = formationCoordinateMap[firstTeamFormation] || [];
  const secondCoord = formationCoordinateMap[secondTeamFormation] || [];

  const assignedFirst = firstCoord.map((coord, idx) => ({
    ...coord,
    nickname: firstTeamPlayers[idx]?.player_list_nickname || "빈자리",
  }));

  const assignedSecond = secondCoord.map((coord, idx) => ({
    ...coord,
    nickname: secondTeamPlayers[idx]?.player_list_nickname || "빈자리",
  }));

  return { assignedFirst, assignedSecond };
};
