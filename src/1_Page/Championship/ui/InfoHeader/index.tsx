import { useNavigate } from "react-router-dom";
// state
import useToggleHeader from "./model/useToggleHeader";
import useEndModal from "./model/useEndModal";
import usePutChampionshipEnd from "../../../../3_Entity/Championship/usePutChampionshipEnd";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import { getTextColorFromBackground } from "../../../../4_Shared/lib/colorChecker";
import { matchType } from "../../../../4_Shared/constant/matchType";
import { championshipTypes } from "../../../../4_Shared/constant/championshipTypes";

const isAdmin = true;

const InfoHeader = (props: InfoHeaderProps) => {
  const { championshipInfo } = props;
  const isChampionshipEnd = championshipInfo.common_status_idx === 4;

  const [isHeaderCollapsed, toggleHeader] = useToggleHeader();
  const [isEndModalOpen, toggleEndModal] = useEndModal();

  const championshipIdx = useParamInteger("championshipIdx");
  const [putChampionshipEnd] = usePutChampionshipEnd(championshipIdx);
  const navigate = useNavigate();

  return (
    <header
      className="relative flex flex-col items-center p-4 overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: championshipInfo.championship_list_color,
        color: getTextColorFromBackground(
          championshipInfo.championship_list_color
        ),
      }}>
      <div className="w-full flex justify-end">
        <button onClick={toggleHeader} className="text-lg hover:opacity-70">
          {isHeaderCollapsed ? "▽" : "△"}
        </button>
      </div>

      {!isHeaderCollapsed && (
        <div className="flex flex-col items-center w-full gap-4">
          <div className="absolute top-0 left-0 w-[100px] h-[100px] border-4 border-current rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-[100px] h-[100px] border-4 border-current rounded-full transform translate-x-1/2 translate-y-1/2"></div>

          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img
              className="w-[40px] h-[40px] object-cover"
              src={championshipInfo.championship_list_throphy_img}
              alt="Trophy"
            />
            <h1 className="text-2xl font-bold">
              {championshipInfo.championship_list_name}
            </h1>
          </div>

          <div className="w-full flex flex-col justify-center sm:flex-row items-center gap-2">
            <p className="px-3 py-2 text-center rounded-md border border-current sm:w-[23%] text-inherit">
              {`${championshipInfo.championship_list_start_date} ~ ${championshipInfo.championship_list_end_date}`}
            </p>
            <p className="w-[40%] px-3 py-2 text-center rounded-md border border-current sm:w-[23%] text-inherit">
              {championshipTypes[championshipInfo.championship_type]}
            </p>
            <p className="w-[40%] px-3 py-2 text-center rounded-md border border-current sm:w-[23%] text-inherit">
              {matchType[championshipInfo.match_type_idx]}
            </p>
          </div>

          <div className="w-[69%] flex flex-col sm:flex-row justify-between items-start gap-4 mt-4">
            <p className="text-inherit flex-1">
              {championshipInfo.championship_list_description}
            </p>
            {isAdmin && !isChampionshipEnd && (
              <div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    onClick={() => {
                      navigate(`/championship/${championshipIdx}/edit`);
                    }}>
                    대회 수정
                  </button>
                  <button
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    onClick={() => {
                      if (confirm("정말 대회를 마감하시겠습니까?")) {
                        putChampionshipEnd();
                      }
                    }}>
                    대회 마감
                  </button>
                </div>
              </div>
            )}
            {isChampionshipEnd && (
              <div className="absolute bottom-0 left-0 w-full p-4 text-center bg-gray-800 text-white">
                <p className="text-sm">
                  대회가 종료되었습니다. 더 이상 수정할 수 없습니다.
                </p>
              </div>
            )}
          </div>
          {isChampionshipEnd && (
            <div
              className="p-6  border-gray-300 flex flex-col items-center h-[200px]"
              style={{
                backgroundColor: championshipInfo.winner_team_color || "white",
                color: getTextColorFromBackground(
                  championshipInfo.winner_team_color || "#ffffff"
                ),
              }}>
              <h3 className="text-xl font-bold">우승팀</h3>
              <div className="flex items-center mt-4">
                <img
                  className="w-16 h-16 object-cover"
                  src={championshipInfo.winner_team_emblem || "placeholder.png"}
                  alt={`${championshipInfo.winner_team_name} 엠블럼`}
                />
                <span className="ml-4 text-2xl font-semibold">
                  {championshipInfo.winner_team_name}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      {isChampionshipEnd && (
        <div className="absolute bottom-0 left-0 w-full p-4 text-center bg-gray-800 text-white">
          <p className="text-sm">
            대회가 종료되었습니다. 더 이상 수정할 수 없습니다.
          </p>
        </div>
      )}
      {isChampionshipEnd && isEndModalOpen && (
        <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-500 scale-100">
            <div className="flex justify-center">
              <div className="text-4xl animate-bounce">🎉</div>
            </div>
            <h2 className="text-3xl font-bold text-center mt-4">축하합니다!</h2>
            {championshipInfo.winner_team_idx &&
              championshipInfo.winner_team_name &&
              championshipInfo.winner_team_emblem && (
                <div className="flex flex-col items-center mt-4">
                  <img
                    className="w-20 h-20 object-cover"
                    src={championshipInfo.winner_team_emblem}
                    alt={`${championshipInfo.winner_team_name} 엠블럼`}
                  />
                  <p className="mt-2 text-2xl font-semibold">
                    {championshipInfo.winner_team_name} 우승
                  </p>
                </div>
              )}
            <p className="mt-4 text-center text-gray-600">
              대회가 종료되었습니다. 모든 결과가 확정되었습니다.
            </p>
            <button
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              onClick={toggleEndModal}>
              확인
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default InfoHeader;
