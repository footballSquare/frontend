import { teamMatchAttribute } from "../../../../4_Shared/constant/teamMatchAttribute";
import { matchType } from "../../../../4_Shared/constant/matchType";
import { matchParticipation } from "../../../../4_Shared/constant/matchParticipation";
import { matchDuration } from "../../../../4_Shared/constant/matchDuration";
import { formation } from "../../../../4_Shared/constant/formation";
import usePostTeamMatch from "../../../../3_Entity/Match/usePostTeamMatch";
import { TeamListIdxProps } from "./type";
import useInputRefs from "./model/useInputRefs";

const MakeTeamMatchModal = (props: TeamListIdxProps) => {
  const { team_list_idx } = props;
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const formattedTime = today.toTimeString().split(" ")[0].slice(0, 5);
  const [refs, getSelectData] = useInputRefs();
  const [postEvent] = usePostTeamMatch(team_list_idx);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-[500px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">팀 매치 모달 생성</h2>
          <button className="text-gray-400 hover:text-gray-600">✖</button>
        </div>

        <div className="space-y-4">
          {/* 매치 속성 선택 */}
          <div>
            <label className="block text-gray-700">매치 속성 선택</label>
            <select
              ref={refs.matchAttributeRef}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1">
              {teamMatchAttribute.map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* 매치 종류 선택 */}
          <div>
            <label className="block text-gray-700">매치 종류 선택</label>
            <div className="flex gap-4 mt-1">
              {matchType.map((item, index) => (
                <label className="flex items-center gap-2" key={index}>
                  <input
                    type="radio"
                    name="matchType"
                    ref={(el) => {
                      if (el) refs.matchDurationRefs.current![index] = el;
                    }}
                    value={index}
                    className="accent-blue-500"
                    defaultChecked={index === 0}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* 승인 참여 방식 선택 */}
          <div>
            <label className="block text-gray-700">승인 참여 방식 선택</label>
            <div className="flex gap-4 mt-1">
              {matchParticipation.map((item, index) => (
                <label className="flex items-center gap-2" key={index}>
                  <input
                    type="radio"
                    name="approval"
                    ref={(el) => {
                      if (el) refs.matchParticipationRefs.current![index] = el;
                    }}
                    value={index}
                    className="accent-blue-500"
                    defaultChecked={index === 0}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* 시작 날짜 선택 */}
          <div>
            <label className="block text-gray-700">시작 날짜 선택</label>
            <input
              type="date"
              defaultValue={formattedDate}
              ref={refs.matchDateRef}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>

          {/* 시작 시간 선택 */}
          <div>
            <label className="block text-gray-700">시작 시간 선택</label>
            <input
              type="time"
              defaultValue={formattedTime}
              ref={refs.matchTimeRef}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>

          {/* 매치 지속 시간 선택 */}
          <div>
            <label className="block text-gray-700">매치 지속 시간 선택</label>
            <div className="flex gap-4 mt-1">
              {matchDuration.map((item, index) => (
                <label className="flex items-center gap-2" key={index}>
                  <input
                    type="radio"
                    name="matchDuration"
                    ref={(el) => {
                      if (el) refs.matchDurationRefs.current![index] = el;
                    }}
                    value={item}
                    className="accent-blue-500"
                    defaultChecked={index === 0}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* 포메이션 선택 */}
          <div>
            <label className="block text-gray-700">포메이션 선택</label>
            <select
              ref={refs.matchFormationRef}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1">
              {formation.map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button className="px-4 py-2 rounded-lg border border-gray-300">
            취소
          </button>
          <button
            onClick={() => {
              postEvent(getSelectData());
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeTeamMatchModal;
