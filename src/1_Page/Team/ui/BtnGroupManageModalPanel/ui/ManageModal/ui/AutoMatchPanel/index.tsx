import { FormProvider, useForm } from "react-hook-form";
import AutoMatchModalInput from "../../../../../../../../4_Shared/hookForm/AutoMatchModalInput";
import { yupResolver } from "@hookform/resolvers/yup";

import useToggleState from "../../../../../../../../4_Shared/model/useToggleState";
import { autoMatchScehma } from "../../../../../../../../4_Shared/hookForm/AutoMatchModalInput/schema";
import useTeamInfoContext from "../../../../../../../../4_Shared/model/useTeamInfoContext";

const AutoMatchPanel = () => {
  const disableFlag = true;
  const [isModalOpen, handleToggle] = useToggleState();
  const { teamListColor } = useTeamInfoContext();

  const methods = useForm<AutoMatchFormValues>({
    resolver: yupResolver(autoMatchScehma),
    defaultValues: {
      autoMatch: false,
      matchAttribute: 1,
      gameType: "1",
      startTime: "10:00",
      duration: "2 hours",
      participationMode: 1,
      formation: 1,
    },
  });
  const { handleSubmit } = methods;

  return (
    <div className="flex flex-col">
      <h2
        className="text-lg font-semibold mb-1"
        style={{ color: teamListColor }}>
        자동 매치
      </h2>
      <p className="text-sm ">자동 매치 설정 하려면 버튼을 클릭하세요.</p>
      <button
        type="button"
        onClick={handleToggle}
        className="py-2 px-6 text-white rounded-md shadow-md transition duration-300 focus:outline-none"
        style={{ backgroundColor: teamListColor }}>
        팀 매치 자동화
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800  rounded-lg  p-6 text-center shadow-lg max-h-[90%] overflow-y-auto">
            <div className="relative mb-4">
              <button
                type="button"
                onClick={handleToggle}
                className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl font-bold leading-none">
                ×
              </button>
              <h2
                className="text-2xl font-bold text-center"
                style={{ color: teamListColor }}>
                자동 매치 생성
              </h2>
            </div>
            {disableFlag && (
              <p className="text-sm text-red-400 mb-3">
                현재 자동 매치 기능은 지원되지 않습니다.
              </p>
            )}
            <hr className="m-4" />

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                })}
                className={`space-y-5 ${
                  disableFlag ? "opacity-50 pointer-events-none" : ""
                }`}>
                <AutoMatchModalInput registerType="autoMatch" />
                <AutoMatchModalInput registerType="matchAttribute" />
                <AutoMatchModalInput registerType="gameType" />
                <AutoMatchModalInput registerType="startTime" />
                <AutoMatchModalInput registerType="duration" />
                <AutoMatchModalInput registerType="participationMode" />
                <AutoMatchModalInput registerType="formation" />

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
                          : "text-white"
                      }`}
                    style={
                      disableFlag
                        ? undefined
                        : { backgroundColor: teamListColor }
                    }>
                    자동 매치 설정 저장
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoMatchPanel;
