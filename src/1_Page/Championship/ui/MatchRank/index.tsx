import React from "react";
import { useNavigate } from "react-router-dom";

interface Team {
  id: number;
  name: string;
  logoUrl: string;
}

interface Match {
  id: number;
  team1: Team | null;
  team2: Team | null;
}

interface Round {
  roundName: string;
  matches: Match[];
}

const TournamentBracket: React.FC = () => {
  const navigate = useNavigate();

  const handleTeamClick = (teamId: number) => {
    navigate(`/team/${teamId}`);
  };

  // 예시 팀 데이터 (총 8팀)
  const teams: Team[] = [
    { id: 1, name: "Team 1", logoUrl: "https://via.placeholder.com/40" },
    { id: 2, name: "Team 2", logoUrl: "https://via.placeholder.com/40" },
    { id: 3, name: "Team 3", logoUrl: "https://via.placeholder.com/40" },
    { id: 4, name: "Team 4", logoUrl: "https://via.placeholder.com/40" },
    { id: 5, name: "Team 5", logoUrl: "https://via.placeholder.com/40" },
    { id: 6, name: "Team 6", logoUrl: "https://via.placeholder.com/40" },
    { id: 7, name: "Team 7", logoUrl: "https://via.placeholder.com/40" },
    { id: 8, name: "Team 8", logoUrl: "https://via.placeholder.com/40" },
  ];

  // 각 라운드별 경기 데이터 (대진표)
  const rounds: Round[] = [
    {
      roundName: "쿼터파이널",
      matches: [
        { id: 1, team1: teams[0], team2: teams[7] },
        { id: 2, team1: teams[3], team2: teams[4] },
        { id: 3, team1: teams[1], team2: teams[6] },
        { id: 4, team1: teams[2], team2: teams[5] },
      ],
    },
    {
      roundName: "세미파이널",
      matches: [
        { id: 5, team1: null, team2: null }, // 쿼터파이널 승자 결정 후 채워짐
        { id: 6, team1: null, team2: null },
      ],
    },
    {
      roundName: "파이널",
      matches: [
        { id: 7, team1: null, team2: null }, // 세미파이널 승자 결정 후 채워짐
      ],
    },
  ];

  return (
    <div className="overflow-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">토너먼트 브래킷</h2>
      <div className="flex space-x-8 justify-center">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">{round.roundName}</h3>
            <div className="space-y-8">
              {round.matches.map((match) => (
                <div key={match.id} className="flex flex-col items-center">
                  {/* 팀 1 */}
                  {match.team1 ? (
                    <div
                      className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => handleTeamClick(match.team1!.id)}>
                      <img
                        src={match.team1.logoUrl}
                        alt={match.team1.name}
                        className="w-8 h-8 mr-2"
                      />
                      <span>{match.team1.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center p-2 border rounded bg-gray-200 w-32 justify-center">
                      <span>Team TBD</span>
                    </div>
                  )}
                  {/* 연결선 */}
                  <div className="w-px h-4 bg-gray-400 my-1"></div>
                  {/* 팀 2 */}
                  {match.team2 ? (
                    <div
                      className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => handleTeamClick(match.team2!.id)}>
                      <img
                        src={match.team2.logoUrl}
                        alt={match.team2.name}
                        className="w-8 h-8 mr-2"
                      />
                      <span>{match.team2.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center p-2 border rounded bg-gray-200 w-32 justify-center">
                      <span>Team TBD</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;
