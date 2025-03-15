import { useFormContext } from "react-hook-form";

export type StatusRadioProps = { modifyMode: boolean };

const StatusRadio = (props: StatusRadioProps) => {
  const { modifyMode } = props;
  const { register, watch } = useFormContext();
  const formKey = "common_status_idx";
  const selectedStatus = watch(formKey);

  return (
    <div>
      <p className="text-sm font-medium text-gray-600">팀 태그 출력</p>
      <div className="flex gap-4">
        <label
          className={`flex items-center gap-2 ${
            !modifyMode && "cursor-not-allowed"
          }`}>
          <input
            type="radio"
            value="0"
            {...register(formKey)}
            disabled={!modifyMode}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 transition ${
              selectedStatus == "0"
                ? "bg-blue-600 border-blue-600"
                : "border-gray-400"
            } ${!modifyMode && "opacity-50"}`}></div>
          <span className="text-sm font-medium">미출력</span>
        </label>
        <label
          className={`flex items-center gap-2 ${
            !modifyMode && "cursor-not-allowed"
          }`}>
          <input
            type="radio"
            value="1"
            {...register(formKey)}
            disabled={!modifyMode}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 transition ${
              selectedStatus == "1"
                ? "bg-green-600 border-green-600"
                : "border-gray-400"
            } ${!modifyMode && "opacity-50"}`}></div>
          <span className="text-sm font-medium">출력</span>
        </label>
      </div>
    </div>
  );
};

export default StatusRadio;
