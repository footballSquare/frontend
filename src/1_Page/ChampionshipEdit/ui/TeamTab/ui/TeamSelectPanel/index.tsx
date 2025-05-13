import { useFormContext } from "react-hook-form";
import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import useHandleTeamClick from "./model/useHandleTeamClick";
import SelectableTeamCard from "../../../../../../2_Widget/SelectableTeamCard";

const TeamSelectPanel = (props: TeamSelectPanelProps) => {
  const { communityTeamList, observeRef } = props;
  const [isModalOpen, toggleModal] = useToggleState();

  const { watch, setValue } = useFormContext();
  const championshipType = watch("championship_type_idx");
  const participation_team_idxs = watch("participation_team_idxs");

  const handleTeamClick = useHandleTeamClick({
    setValue,
    championshipType,
    participation_team_idxs,
  });

  return (
    <div>
      <button
        type="button"
        className="px-4 py-2.5 bg-grass-600 hover:bg-grass-700 text-white rounded-lg transition-colors duration-150 flex items-center shadow-md"
        onClick={toggleModal}>
        팀 선택
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-200">
          <div
            className="bg-gray-900 p-6 rounded-xl max-h-[80vh] overflow-y-auto w-full max-w-3xl border border-gray-700 shadow-xl"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">팀 선택</h2>
              <button
                onClick={toggleModal}
                className="p-1 rounded-full hover:bg-gray-700 transition-colors duration-150">
                X
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communityTeamList &&
                communityTeamList.map((teamInfo, index) => (
                  <SelectableTeamCard
                    observeRef={
                      (communityTeamList.length === index + 1 && observeRef) ||
                      undefined
                    }
                    key={`team_card_${teamInfo.team_list_idx || index}`}
                    teamInfo={teamInfo}
                    onClickEvent={handleTeamClick}
                  />
                ))}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-150"
                onClick={toggleModal}>
                취소
              </button>
              <button
                type="button"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-150 shadow-md"
                onClick={toggleModal}>
                선택 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSelectPanel;
