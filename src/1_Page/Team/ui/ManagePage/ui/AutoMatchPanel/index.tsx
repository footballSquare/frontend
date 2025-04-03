import { useForm } from "react-hook-form";

import { formatTime30 } from "../../../../../../4_Shared/lib/dateFormatter";
// 상수
import { teamMatchAttribute } from "../../../../../../4_Shared/constant/teamMatchAttribute";
import { matchType } from "../../../../../../4_Shared/constant/matchType";
import { matchParticipation } from "../../../../../../4_Shared/constant/matchParticipation";
import { matchFormation } from "../../../../../../4_Shared/constant/matchFormation";
import { matchDuration } from "../../../../../../4_Shared/constant/matchDuration";
// state
import useToggleState from "../../../../../../4_Shared/model/useToggleState";

const AutoMatchPanel = () => {
  const disableFlag = true;
  const [isModalOpen, handleToggle] = useToggleState();

  const { register, handleSubmit, watch } = useForm<AutoMatchForm>({
    defaultValues: {
      autoMatch: 1,
      matchAttribute: 1,
      gameType: "1",
      startTime: "10:00",
      duration: "2 hours",
      participationMode: 1,
      formation: 1,
    },
  });
  const watchGameType = watch("gameType");
  const isCanFormation = watchGameType === "0";
  const onSubmit = (data: AutoMatchForm) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700">자동 매치</h2>
      <p className="text-sm text-gray-500">
        자동 매치 설정 하려면 버튼을 클릭하세요.
      </p>
      <button
        type="button"
        onClick={handleToggle}
        className="py-2 px-6 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
        팀 매치 자동화
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 text-center shadow-lg max-h-[90%] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
              자동 매치 생성
            </h2>
            <p>현재 지원되지 않는 기능입니다</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Auto Match Toggle */}
              <div className="flex items-center space-x-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("autoMatch")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
                <span className="text-sm font-medium text-gray-700">
                  자동 매치 생성
                </span>
              </div>

              {/* Match Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  매치 속성
                </label>
                <select
                  {...register("matchAttribute")}
                  className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200">
                  {teamMatchAttribute.map((attribute, index) => (
                    <option value={index}>{attribute}</option>
                  ))}
                </select>
              </div>

              {/* Game Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  게임 종류
                </label>
                <select
                  {...register("gameType")}
                  className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200">
                  {matchType.map((type, index) => (
                    <option value={index}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Match Start Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  매치 시작 시간
                </label>
                <select
                  {...register("startTime")}
                  className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200">
                  {formatTime30.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Match Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  매치 진행 시간
                </label>
                <select
                  {...register("duration")}
                  className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200">
                  {matchDuration.map((time) => (
                    <option value={time}>{time}</option>
                  ))}
                </select>
              </div>

              {/* Participation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  매치 참여 방식
                </label>
                <select
                  {...register("participationMode")}
                  className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200">
                  {matchParticipation.map((participation, index) => (
                    <option value={index}>{participation}</option>
                  ))}
                </select>
              </div>

              {/* Formation Selection */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  포메이션
                </label>
                <select
                  {...register("formation")}
                  className={`w-full p-3 text-sm border-2 rounded-xl focus:outline-none transition-all duration-200 
             ${
               isCanFormation
                 ? "border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                 : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
             }`}
                  disabled={!isCanFormation}>
                  {matchFormation.map((formation, index) => (
                    <option key={index} value={index}>
                      {formation}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={handleToggle}
                  className="py-2.5 px-6 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors duration-200">
                  모달 닫기
                </button>

                <button
                  disabled={disableFlag}
                  type="submit"
                  className={`py-2.5 px-6 font-medium rounded-xl transition-colors duration-200 shadow-md
                    ${
                      disableFlag
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}>
                  자동 매치 설정 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoMatchPanel;
