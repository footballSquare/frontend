import React from "react";
import { useNavigate } from "react-router-dom";
import { ACTIVE_TAB } from "../../constant/activeTab";
import { convertToMatchData } from "./util/convertToMatchData";

import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchListTab from "./ui/MatchListTab";

import useManageMatchList from "./model/useManageMatchList";
import useGetChampionshipMatchList from "../../../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useGetChampionshipTeamList from "../../../../../../3_Entity/Championship/useGetChampionshipTeams";
import useParamInteger from "../../../../../../4_Shared/model/useParamInteger";
import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import { convertHexToRGBA } from "../../../../../../4_Shared/lib/colorConverter";

const TeamAndMatchTab = (props: TeamAndMatchTabProps) => {
  const { championship_type_idx, activeTab } = props;
  const isLeague = championship_type_idx === 0;
  const championshipIdx = useParamInteger("championshipIdx");
  const navigate = useNavigate();

  const [isModalOpen, handleToggleModal] = useToggleState();

  const [matchList, fetchMatchList] =
    useGetChampionshipMatchList(championshipIdx); // 대회 생성된 매치 리스트
  const [teamList] = useGetChampionshipTeamList(championshipIdx); // 대회 참가 팀리스트
  const [displayMatchList, matchHandlers] = useManageMatchList(matchList); // 매치 리스트 관리
  const convertedData = React.useMemo(() => {
    return convertToMatchData(
      displayMatchList,
      teamList,
      championship_type_idx
    );
  }, [displayMatchList, teamList, championship_type_idx]);

  return (
    <div>
      <div className="flex justify-end">
        <button className="border p-4 rounded-2xl" onClick={handleToggleModal}>
          팀 상세보기
        </button>
      </div>
      {/* 팀 목록 탭 */}
      <div className={activeTab === ACTIVE_TAB.TEAMS ? "block" : "hidden"}>
        {isLeague ? (
          <LeagueBracket leagueData={convertedData.leagueData} />
        ) : (
          <TournamentBracket tournamentData={convertedData.tournamentData} />
        )}
      </div>

      {/* 매치 목록 탭  */}
      <div className={activeTab === ACTIVE_TAB.MATCHES ? "block" : "hidden"}>
        <MatchListTab
          matchList={displayMatchList}
          filteredTeamList={convertedData.filteredTeamList}
          matchHandlers={matchHandlers}
          fetchMatchList={fetchMatchList}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg">
            <div className="w-full flex justify-end">
              <button
                onClick={handleToggleModal}
                className="m-1 px-4 py-2 text-red-500 font-semibold border border-red-300 rounded-md hover:bg-red-50 active:scale-95 transition-all">
                닫기
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 max-h-[700px] p-4 ">
              {teamList.map((team) => {
                const { teamColor, teamBgColor, teamBorderColor } =
                  convertHexToRGBA(team.team_list_color);
                return (
                  <div
                    onClick={() => {
                      navigate(`/team/${team.team_list_idx}`);
                    }}
                    key={"team_card_" + team.team_list_idx}
                    style={{
                      backgroundColor: teamBgColor,
                      borderColor: teamBorderColor,
                      borderLeft: `4px solid ${teamColor}`,
                    }}
                    className={`cursor-pointer p-3 border rounded-lg transition-all duration-200 hover:shadow-md `}>
                    <div className="flex items-center space-x-2">
                      {team.team_list_emblem && (
                        <div
                          className="flex-shrink-0"
                          style={{ minWidth: "40px" }}>
                          <img
                            src={team.team_list_emblem}
                            alt={team.team_list_name}
                            className="w-10 h-10 object-contain rounded-full bg-white p-1 border shadow-sm"
                            style={{ borderColor: teamColor }}
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div
                          className="font-bold text-gray-800 truncate"
                          title={team.team_list_name}>
                          {team.team_list_name}
                        </div>
                        <div
                          className={`text-xs truncate font-semibold`}
                          title={team.team_list_short_name}>
                          {team.team_list_short_name}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamAndMatchTab;
