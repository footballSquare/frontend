import { useFieldArray, useFormContext } from "react-hook-form";
import { championshipTypes } from "../../../../4_Shared/constant/championshipTypes";

const DateTab = () => {
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: "championship_award",
  });

  const championshipType = watch("championship_type_idx");

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 대회 기간 (시작일, 종료일) */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">시작일</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            {...register("championship_list_start_date")}
          />
          {errors.championship_list_start_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.championship_list_start_date.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">종료일</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            {...register("championship_list_end_date")}
          />
          {errors.championship_list_end_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.championship_list_end_date.message as string}
            </p>
          )}
        </div>
      </div>

      {/* 요약 정보 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-700 mb-3">대회 정보 요약</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
          <div className="flex">
            <span className="w-24 text-gray-500">대회명:</span>
            <span className="font-medium">
              {watch("championship_list_name") || "-"}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500">대회 종류:</span>
            <span className="font-medium">
              {championshipTypes[championshipType]}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500">시작일:</span>
            <span className="font-medium">
              {watch("championship_list_start_date") || "-"}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500">종료일:</span>
            <span className="font-medium">
              {watch("championship_list_end_date") || "-"}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500">참가 팀:</span>
            <span className="font-medium">
              {watch("participation_team_idxs").length}팀
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500">수상 항목:</span>
            <span className="font-medium">{fields.length}개</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTab;
