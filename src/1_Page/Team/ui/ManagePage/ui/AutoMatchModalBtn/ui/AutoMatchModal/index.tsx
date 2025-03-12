import { useForm } from "react-hook-form";

import { FormValues, AutoMatchModalProps } from "./type";

const AutoMatchModal = (props: AutoMatchModalProps) => {
  const { onClose } = props;

  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      autoMatch: false,
      matchType: "team",
      gameType: "11v11",
      startTime: "10:00",
      duration: "2 hours",
      participationMode: "anyone",
      formation: "433",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log(data);
    onClose();
  };

  const watchGameType = watch("gameType");

  return (
    <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 text-center shadow-lg max-h-[90%] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          자동 매치 생성
        </h2>

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
              {...register("matchType")}
              className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200">
              <option value="team">팀 매치</option>
              <option value="public">팀 공개 매치</option>
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
              <option value="11v11">11:11</option>
              <option value="4v4">4:4</option>
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
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
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
              <option value="2 hours">2시간</option>
              <option value="1 hour">1시간</option>
              <option value="30 minutes">30분</option>
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
              <option value="anyone">아무나 참여</option>
              <option value="approval">승인 참여</option>
            </select>
          </div>

          {/* Formation Selection */}
          {watchGameType === "11v11" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                포메이션
              </label>
              <select
                {...register("formation")}
                className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200">
                <option value="433">4-3-3</option>
                <option value="442">4-4-2</option>
                <option value="352">3-5-2</option>
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-6 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors duration-200">
              모달 닫기
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-md">
              자동 매치 설정 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutoMatchModal;
