import { useFieldArray, useFormContext } from "react-hook-form";

const AwardTab = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "championship_award",
  });
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="font-medium text-gray-700">개인 수상 종류</label>
        <button
          type="button"
          onClick={() =>
            append({ championship_award_name: "", file: undefined })
          }
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          수상 항목 추가
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mr-3">
              {index + 1}
            </div>
            <input
              type="text"
              className="flex-1 border-0 border-b border-gray-200 py-1 focus:ring-0 focus:border-blue-500 outline-none transition"
              placeholder="예) MVP, 득점왕, 베스트 골키퍼"
              {...register(
                `championship_award.${index}.championship_award_name` as const
              )}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="p-6 text-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">수상 항목을 추가해주세요</p>
          </div>
        )}
      </div>

      {errors.championship_award && (
        <p className="text-red-500 text-sm mt-2">
          {errors.championship_award.message as string}
        </p>
      )}
    </div>
  );
};
export default AwardTab;
