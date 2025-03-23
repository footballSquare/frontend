import trophy from "../assets/img/trophy.jpg";

const teams = [
  { idx: 20, name: "FC Barcelona", short: "BAR", color: "#A50044" },
  { idx: 21, name: "Real Madrid", short: "RMA", color: "#FFFFFF" },
  { idx: 30, name: "Manchester United", short: "MUN", color: "#DA291C" },
  { idx: 31, name: "Chelsea", short: "CHE", color: "#034694" },
  { idx: 40, name: "Bayern Munich", short: "BAY", color: "#DC052D" },
  { idx: 41, name: "Borussia Dortmund", short: "BVB", color: "#FFE000" },
  { idx: 50, name: "Paris Saint-Germain", short: "PSG", color: "#004170" },
  { idx: 51, name: "Juventus", short: "JUV", color: "#000000" },
  { idx: 60, name: "Liverpool", short: "LIV", color: "#C8102E" },
  { idx: 61, name: "Inter Milan", short: "INT", color: "#003399" },
  { idx: 70, name: "AC Milan", short: "MIL", color: "#FB090B" },
  { idx: 71, name: "Atletico Madrid", short: "ATM", color: "#D50C2F" },
  { idx: 80, name: "Tottenham Hotspur", short: "TOT", color: "#132257" },
  { idx: 81, name: "Arsenal", short: "ARS", color: "#EF0107" },
];

const totalRounds = 8;
let matchIndex = 1;
const matchList = [];

for (let round = 1; round <= totalRounds; round++) {
  for (let i = 0; i < teams.length; i += 2) {
    matchList.push({
      championship_match_idx: matchIndex++,
      championship_match_first: {
        team_list_idx: teams[i].idx,
        championship_match_first_idx: matchIndex * 100,
        team_list_name: teams[i].name,
        team_list_short_name: teams[i].short,
        team_list_color: teams[i].color,
        team_list_emblem: trophy,
        match_team_stats_our_score: Math.floor(Math.random() * 4),
        match_team_stats_other_score: Math.floor(Math.random() * 4),
        common_status_idx: 4,
      },
      championship_match_second: {
        team_list_idx: teams[i + 1].idx,
        championship_match_second_idx: matchIndex * 100 + 1,
        team_list_name: teams[i + 1].name,
        team_list_short_name: teams[i + 1].short,
        team_list_color: teams[i + 1].color,
        team_list_emblem: trophy,
        match_team_stats_our_score: Math.floor(Math.random() * 4),
        match_team_stats_other_score: Math.floor(Math.random() * 4),
        common_status_idx: 4,
      },
    });
  }
}

export const mockChampionshipMatchList = {
  championship_match: matchList,
};
