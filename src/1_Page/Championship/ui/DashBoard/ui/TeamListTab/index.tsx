import { useNavigate } from "react-router-dom";
import DefaultTeamEmblem from "../../../../../../4_Shared/components/DefaultTeamEmblem";

const TeamListTab = (props: TeamListTabProps) => {
  const { teamList } = props;
  const navigate = useNavigate();
  return (
    <section className="bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-gray-800 rounded-full p-3">
            <span className="text-gray-300 text-xl">🏆</span>
          </div>
          <h2 className="text-2xl font-bold text-white">참가 팀 목록</h2>
        </div>
        <p className="text-gray-400 mt-2">
          대회에 참가 중인 모든 팀을 확인하고 팀 페이지로 이동할 수 있습니다.
        </p>
        {teamList.length > 0 && (
          <div className="mt-3 text-sm text-gray-500">
            <span>총 {teamList.length}개 팀 참가</span>
          </div>
        )}
      </div>

      {teamList.length === 0 ? (
        <div className="py-20 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-3xl p-8 shadow-2xl">
              <span className="text-gray-300 text-5xl">🏆</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              참가 팀이 없습니다
            </h3>
            <p className="text-gray-400 text-center max-w-md text-lg">
              아직 대회에 참가한 팀이 없습니다. 팀 등록이 완료되면 여기에
              표시됩니다.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamList.map((team) => (
              <div
                key={team.team_list_idx}
                className="bg-white/5 rounded-2xl p-6 cursor-pointer hover:bg-white/10 border border-white/10 hover:border-white/20"
                onClick={() => {
                  navigate(`/team/${team.team_list_idx}`);
                }}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {team.team_list_emblem ? (
                      <img
                        src={team.team_list_emblem}
                        alt={team.team_list_name}
                        className="w-16 h-16 object-contain rounded-2xl bg-white/10 p-2"
                      />
                    ) : (
                      <div className="w-16 h-16">
                        <DefaultTeamEmblem
                          bgColor={team.team_list_color}
                          text={team.team_list_short_name}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg">
                      {team.team_list_name}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium">
                      {team.team_list_short_name}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-medium">
                      <span>팀 페이지 보기</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-gray-400 text-xl">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamListTab;
