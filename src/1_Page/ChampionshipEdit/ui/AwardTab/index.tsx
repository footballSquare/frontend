import { useFormContext } from "react-hook-form";
import plus from "../../../../4_Shared/assets/svg/plus.svg";
import AwardRow from "./ui/AwardRow";

const AwardTab = (props: AwartTabProps) => {
  const { fields, append, remove } = props;
  const {
    formState: { errors },
  } = useFormContext();

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
          <img src={plus} alt="추가 아이콘" className="h-4 w-4 mr-1" />
          수상 항목 추가
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <AwardRow field={field} index={index} remove={remove} />
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
