import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import garbage from "../../../../../../4_Shared/assets/svg/garbage.svg";
import placeholder from "../../../../../../4_Shared/assets/svg/placeholder.svg";

const AwardRow = (props: AwardRowProps) => {
  const { index, field, remove } = props;
  const { control, register } = useFormContext<ChampionshipFormValues>();

  const selectedFile = useWatch({
    control,
    name: `championship_award.${index}.file`,
  });

  const filePreview = React.useMemo(() => {
    if (selectedFile instanceof FileList && selectedFile.length > 0) {
      return URL.createObjectURL(selectedFile[0]);
    }
    return null;
  }, [selectedFile]);

  return (
    <div
      key={field.id + " : " + index}
      className="flex w-full items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="w-10 h-10 bg-gray-100 mr-3 flex items-center justify-center">
        {filePreview ? (
          <img
            src={filePreview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={placeholder}
            alt="placeholder"
            className="h-5 w-5 text-gray-400"
          />
        )}
      </div>
      <input
        type="text"
        className="flex-1 border-0 border-b border-gray-200 py-1 focus:ring-0 focus:border-blue-500 outline-none transition"
        placeholder="예) MVP, 득점왕, 베스트 골키퍼"
        {...register(
          `championship_award.${index}.championship_award_name` as const
        )}
      />
      <label className="ml-2 px-3 py-1 border border-gray-300 rounded cursor-pointer text-gray-600 hover:bg-gray-100">
        사진 추가
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          {...register(`championship_award.${index}.file` as const, {
            setValueAs: (v) => v[0], // FileList에서 첫번째 File 추출
          })}
        />
      </label>
      <button
        type="button"
        onClick={() => remove(index)}
        className="ml-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 transition">
        <img src={garbage} />
      </button>
    </div>
  );
};

export default AwardRow;
