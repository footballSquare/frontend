import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import statInputSchema from "./yupSchema/statInputSchema";
import Input from "./ui/Input";
import { StatInputModalProps } from "./type";
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
    resolver: yupResolver(statInputSchema),
  });

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      {/* 레이어 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-gray"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 border-1 border-gray shadow-2xl absolute top-7 left-[35%] bg-white p-4"
      >
        <button onClick={toggleStatInputModal}>X</button>
        <Input
          register={register}
          registerType={"evidence"}
          errors={errors}
          text={"증빙자료"}
          type={"file"}
          isMatchEnd={isMatchEnd}
        />
        <Input
          register={register}
          registerType={"goals"}
          errors={errors}
          text={"득점"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <Input
          register={register}
          registerType={"assists"}
          errors={errors}
          text={"어시스트"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <Input
          register={register}
          registerType={"passAccuracy"}
          errors={errors}
          text={"패스 정확도"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <Input
          register={register}
          registerType={"tackleAccuracy"}
          errors={errors}
          text={"태클 정확도"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <Input
          register={register}
          registerType={"possession"}
          errors={errors}
          text={"볼 점유율"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <Input
          register={register}
          registerType={"standingTackles"}
          errors={errors}
          text={"스탠딩 태클 성공"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <Input
          register={register}
          registerType={"slidingTackles"}
          errors={errors}
          text={"슬라이딩 태클 성공"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <Input
          register={register}
          registerType={"interceptions"}
          errors={errors}
          text={"가로채기"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <Input
          register={register}
          registerType={"saves"}
          errors={errors}
          text={"선방"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <Input
          register={register}
          registerType={"saveSuccessRate"}
          errors={errors}
          text={"선방 성공률"}
          type={"number"}
          isMatchEnd={isMatchEnd}
        />
        <button type="submit" disabled={!isValid}>
          제출
        </button>
      </form>
    </div>
  );
};

export default StatInputModal;
