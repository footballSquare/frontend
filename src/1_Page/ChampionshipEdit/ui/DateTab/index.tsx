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
  const startDateError = errors?.championship_list_start_date;
  const endDateError = errors?.championship_list_end_date;

  return (
    <section className="space-y-8 rounded-xl bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-700 p-6">
      {/* 대회 기간 (시작일 / 종료일) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 시작일 */}
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            시작일
          </span>
          <input
            type="date"
            {...register("championship_list_start_date")}
            className={`rounded-md border px-3 py-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              startDateError ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {startDateError && (
            <span className="text-xs text-red-500">
              {startDateError.message as string}
            </span>
          )}
        </label>

        {/* 종료일 */}
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            종료일
          </span>
          <input
            type="date"
            {...register("championship_list_end_date")}
            className={`rounded-md border px-3 py-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              endDateError ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {endDateError && (
            <span className="text-xs text-red-500">
              {endDateError.message as string}
            </span>
          )}
        </label>
      </div>

      {/* 대회 정보 요약 */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">
          대회 정보 요약
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex justify-between">
            <span>대회명</span>
            <span>{watch("championship_list_name") || "-"}</span>
          </li>
          <li className="flex justify-between">
            <span>대회 종류</span>
            <span>{championshipTypes[championshipType]}</span>
          </li>
          <li className="flex justify-between">
            <span>시작일</span>
            <span>{watch("championship_list_start_date") || "-"}</span>
          </li>
          <li className="flex justify-between">
            <span>종료일</span>
            <span>{watch("championship_list_end_date") || "-"}</span>
          </li>
          <li className="flex justify-between">
            <span>참가 팀</span>
            <span>{watch("participation_team_idxs").length}팀</span>
          </li>
          <li className="flex justify-between">
            <span>수상 항목</span>
            <span>{fields.length}개</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DateTab;
