import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import StatInput from "../../../../../../../../4_Shared/hookForm/StatInput";
import statInputschema from "../../../../../../../../4_Shared/hookForm/StatInput/schema";
import useMatchModalStore from "../../../../../../../../4_Shared/zustand/useMatchModal";

const StatInputModal = (props: StatInputModalProps) => {
  const {isMatchEnd} = useMatchModalStore();
  const { toggleStatInputModal } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(statInputschema),
    defaultValues:{
      evidence: "",
      goals: 0,
      assists: 0,
      passAccuracy: 0,
      tackleAccuracy: 0,
      possession: 0,
      standingTackles: 0,
      slidingTackles: 0,
      interceptions: 0,
      saves: 0,
      saveSuccessRate: 0,
    }
  });
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      {/* 레이어 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-gray"></div>
      <form
        onSubmit={handleSubmit(()=>{console.log("submit")})}
        className="flex flex-col gap-2 border-1 border-gray shadow-2xl absolute top-7 left-[35%] bg-white p-4 max-w-[300px] max-h-[500px] overflow-auto"
      >
        <button onClick={toggleStatInputModal}>X</button>
        <StatInput
          register={register}
          registerType={"evidence"}
          errors={errors}
          text={"증빙자료"}
          type={"file"}
          isMatchEnd={isMatchEnd}
        />
        <StatInput
          register={register}
          registerType={"goals"}
          errors={errors}
          text={"득점"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <StatInput
          register={register}
          registerType={"assists"}
          errors={errors}
          text={"어시스트"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <StatInput
          register={register}
          registerType={"passAccuracy"}
          errors={errors}
          text={"패스 정확도"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <StatInput
          register={register}
          registerType={"tackleAccuracy"}
          errors={errors}
          text={"태클 정확도"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <StatInput
          register={register}
          registerType={"possession"}
          errors={errors}
          text={"볼 점유율"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <StatInput
          register={register}
          registerType={"standingTackles"}
          errors={errors}
          text={"스탠딩 태클 성공"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <StatInput
          register={register}
          registerType={"slidingTackles"}
          errors={errors}
          text={"슬라이딩 태클 성공"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <StatInput
          register={register}
          registerType={"interceptions"}
          errors={errors}
          text={"가로채기"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <StatInput
          register={register}
          registerType={"saves"}
          errors={errors}
          text={"선방"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <StatInput
          register={register}
          registerType={"saveSuccessRate"}
          errors={errors}
          text={"선방 성공률"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 rounded ${
            isValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray cursor-not-allowed"
          }`}
        >
          제출
        </button>
      </form>
    </div>
  );
};

export default StatInputModal;
