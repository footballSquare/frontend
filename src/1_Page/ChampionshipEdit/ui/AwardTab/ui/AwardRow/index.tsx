import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { imgConverter } from "../../../../../../4_Shared/lib/imgConverter";
import emptyImg from "../../../../../../4_Shared/assets/svg/empty-img.svg";
import garbageIcon from "../../../../../../4_Shared/assets/svg/garbage.svg";
import uploadPohtoIcon from "../../../../../../4_Shared/assets/svg/uploadphoto-gray.svg";

const AwardRow = (props: AwardRowProps) => {
  const { index, field, remove } = props;
  const { control, register, setValue } = useFormContext();

  const selectedFile = useWatch({
    control,
    name: `championship_award.${index}.files`,
  });
  const filePreview = React.useMemo(
    () => imgConverter(selectedFile),
    [selectedFile]
  );

  return (
    <div
      key={field.id + " : " + index}
      className="flex w-full items-center p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-md transition-all hover:border-gray-600">
      <div className="w-12 h-12 bg-gray-900 mr-3 flex items-center justify-center overflow-hidden rounded">
        {filePreview ? (
          <img
            src={filePreview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={emptyImg} className="w-[30px] h-[30px]" />
        )}
      </div>

      <div className="flex-1 relative">
        <input
          type="text"
          className="w-full bg-transparent border-0 border-b border-gray-700 py-2 px-1 focus:ring-0 focus:border-blue-500 outline-none transition text-gray-100 placeholder-gray-500"
          placeholder="예) MVP, 득점왕, 베스트 골키퍼"
          {...register(
            `championship_award.${index}.championship_award_name` as const
          )}
        />
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
      </div>

      <label className="ml-3 px-3 py-1.5 border border-gray-600 rounded-md cursor-pointer text-gray hover:bg-gray-700 transition-colors flex items-center">
        <img src={uploadPohtoIcon} className="w-[20px] h-[20px] mr-1" />
        사진
        <input
          type="file"
          accept="image/*"
          className="hidden"
          {...register(`championship_award.${index}.files` as const, {
            onChange: (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue(`championship_award.${index}.files`, file, {
                  shouldValidate: true,
                });
              }
            },
          })}
        />
      </label>

      <button
        type="button"
        onClick={() => remove(index)}
        className="ml-2 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-gray-700 rounded-full transition-all"
        aria-label="삭제">
        <img src={garbageIcon} className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
};

export default AwardRow;
