import useScale from "./model/useScale";
import useChampionshipInfoContext from "../../../../../../../../4_Shared/model/useChampionshipInfoContext";
import { getTextColorFromBackground } from "../../../../../../../../4_Shared/lib/colorChecker";
import DefaultTeamEmblem from "../../../../../../../../4_Shared/components/DefaultTeamEmblem";

const TournamentBracket = (props: TournamentBracketProps) => {
  const { tournamentData } = props;
  const { scale, increaseScale, decreaseScale } = useScale();
  const { championshipListColor } = useChampionshipInfoContext();
  const textColor = getTextColorFromBackground(championshipListColor);

  return (
    <div className="p-6  text-gray-100 rounded-lg overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        토너먼트 대진표
      </h1>

      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={decreaseScale}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-sm rounded text-gray-100">
          -
        </button>
        <button
          onClick={increaseScale}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-sm rounded text-gray-100">
          +
        </button>
      </div>

      <div
        className="flex min-w-max justify-center transition-all overflow-x-auto"
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {tournamentData.map((roundContnet, index) => (
          <div
            key={index + "_match_" + roundContnet.round}
            className="flex-shrink-0 px-4"
            style={{ width: "280px" }}>
            {/* 라운드 제목 16, 8 ,4 등 */}
            <div className="py-2 px-4 rounded-t-lg text-center font-bold bg-gray-700 text-gray-100">
              {roundContnet.label}
            </div>

            {/* 매치 컨테이너 */}
            <div className="space-y-12 relative mt-4">
              {roundContnet.matchList.map(
                (match: ChampionshipMatchList, index: number) => {
                  const team1Score =
                    match.championship_match_first.match_team_stats_our_score ||
                    0;
                  const team2Score =
                    match.championship_match_second
                      .match_team_stats_our_score || 0;

                  const team1Won = team1Score > team2Score;
                  const team2Won = team2Score > team1Score;

                  // 경기 상태 (예: common_status_idx=4가 종료)
                  const isFinished =
                    match.championship_match_first.common_status_idx === 4 ||
                    match.championship_match_second.common_status_idx === 4;
                  return (
                    <div
                      className="relative"
                      key={
                        index + "_match_card_" + match.championship_match_idx
                      }>
                      {/* 현재 라운드 매치카드 */}
                      <div className="border border-gray-600 rounded-lg overflow-hidden shadow-md text-gray-100">
                        <div className="px-4 py-2 flex justify-between items-center bg-gray-700">
                          <span className="text-sm font-medium">{`매치 ${match.championship_match_idx}`}</span>
                          <span
                            className="px-2 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: isFinished
                                ? championshipListColor
                                : `${textColor}33`,
                              color: isFinished
                                ? textColor
                                : championshipListColor,
                            }}>
                            {isFinished ? "종료" : "진행 예정"}
                          </span>
                        </div>

                        {/* 팀 1 */}
                        <div
                          className="p-3 flex items-center"
                          style={{
                            backgroundColor:
                              team1Won && isFinished
                                ? `${championshipListColor}33`
                                : "#1F2937", // Tailwind gray‑800 to guarantee readability
                          }}>
                          <div className="w-10 h-10 rounded-full shadow-sm flex items-center justify-center p-1 mr-3">
                            {match.championship_match_first.team_list_emblem ? (
                              <img
                                alt={
                                  match.championship_match_first.team_list_name
                                }
                                src={
                                  match.championship_match_first
                                    .team_list_emblem
                                }
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <DefaultTeamEmblem
                                text={
                                  match.championship_match_first
                                    .team_list_short_name
                                }
                                bgColor={
                                  match.championship_match_first.team_list_color
                                }
                              />
                            )}
                          </div>
                          <div className="flex-grow flex items-center gap-1">
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  match.championship_match_first
                                    .team_list_color || "#ffffff",
                              }}></span>
                            <span
                              className={`font-medium ${
                                team1Won && isFinished ? "font-bold" : ""
                              }`}
                              style={{ color: "#ffffff" }}>
                              {match.championship_match_first.team_list_name}
                            </span>
                          </div>
                          <div
                            className="w-8 h-8 flex items-center justify-center rounded-full font-bold"
                            style={{
                              backgroundColor: team1Won
                                ? championshipListColor
                                : "#374151", // Tailwind gray-700
                              color:
                                team1Won && isFinished ? textColor : "#f3f4f6", // Tailwind gray-100
                            }}>
                            {team1Score}
                          </div>
                        </div>

                        {/* 구분선 */}
                        <div className="border-t border-gray-200"></div>

                        {/* 팀 2 */}
                        <div
                          className="p-3 flex items-center"
                          style={{
                            backgroundColor: team2Won
                              ? `${championshipListColor}33`
                              : "#1F2937",
                          }}>
                          <div className="w-10 h-10 rounded-full shadow-sm flex items-center justify-center p-1 mr-3">
                            {match.championship_match_second
                              .team_list_emblem ? (
                              <img
                                alt={
                                  match.championship_match_second.team_list_name
                                }
                                src={
                                  match.championship_match_second
                                    .team_list_emblem
                                }
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <DefaultTeamEmblem
                                text={
                                  match.championship_match_second
                                    .team_list_short_name
                                }
                                bgColor={
                                  match.championship_match_second
                                    .team_list_color
                                }
                              />
                            )}
                          </div>
                          <div className="flex-grow flex items-center gap-1">
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  match.championship_match_second
                                    .team_list_color || "#ffffff",
                              }}></span>
                            <span
                              className={`font-medium ${
                                team2Won && isFinished ? "font-bold" : ""
                              }`}
                              style={{ color: "#ffffff" }}>
                              {match.championship_match_second.team_list_name}
                            </span>
                          </div>
                          <div
                            className="w-8 h-8 flex items-center justify-center rounded-full font-bold"
                            style={{
                              backgroundColor:
                                team2Won && isFinished
                                  ? championshipListColor
                                  : "#374151", // Tailwind gray-700
                              color:
                                team2Won && isFinished ? textColor : "#f3f4f6", // Tailwind gray-100
                            }}>
                            {team2Score}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;
