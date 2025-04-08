import { useFormContext } from "react-hook-form";
type BasicTabProps = {
  previewImage: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const BasicTab = (props: BasicTabProps) => {
  const { previewImage, handleImageChange } = props;

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const championshipColor = watch("championship_list_color");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 대회명 */}
      <div className="col-span-1 md:col-span-2">
        <label className="block mb-1 font-medium text-gray-700">대회명</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="예) 우리동네 축구 리그"
          {...register("championship_list_name")}
        />
        {errors.championship_list_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.championship_list_name.message}
          </p>
        )}
      </div>

      {/* 대회 종류 선택 */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          대회 종류
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition"
          {...register("championship_type_idx")}>
          <option value={1}>리그</option>
          <option value={2}>16강 토너먼트</option>
          <option value={3}>8강 토너먼트</option>
          {/* 필요시 추가 옵션 */}
        </select>
        {errors.championship_type_idx && (
          <p className="text-red-500 text-sm mt-1">
            {errors.championship_type_idx.message}
          </p>
        )}
      </div>

      {/* 대회 색상 */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          대회 색상
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer"
            {...register("championship_list_color")}
          />
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            value={championshipColor}
            onChange={(e) =>
              setValue("championship_list_color", e.target.value)
            }
            placeholder="#HEX"
          />
        </div>
        {errors.championship_list_color && (
          <p className="text-red-500 text-sm mt-1">
            {errors.championship_list_color.message}
          </p>
        )}
      </div>

      {/* 트로피 이미지 */}
      <div className="md:col-span-2">
        <label className="block mb-1 font-medium text-gray-700">
          트로피 이미지
        </label>
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="w-full md:w-2/3">
            <label className="flex items-center justify-center w-full h-32 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                {...register("championship_list_throphy_img")}
                onChange={handleImageChange}
              />
              <div className="text-center">
                <div className="flex items-center justify-center ">
                  <img src={uploadSvg} alt="Upload" className="w-12 h-12" />
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  이미지를 클릭하여 업로드하세요
                </p>
                <p className="text-xs text-gray-400">PNG, JPG (최대 2MB)</p>
              </div>
            </label>
            {errors.championship_list_throphy_img && (
              <p className="text-red-500 text-sm mt-1">
                {errors.championship_list_throphy_img.message as string}
              </p>
            )}
          </div>

          {/* 이미지 미리보기 */}
          <div className="w-full md:w-1/3 flex items-center justify-center">
            <div className="w-24 h-24 border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
              <img
                src={previewImage || emptySvg}
                alt="Trophy Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 대회 설명 */}
      <div className="md:col-span-2">
        <label className="block mb-1 font-medium text-gray-700">
          대회 공지 및 설명
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 h-28 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="대회 진행 방식, 주의사항 등"
          {...register("championship_list_description")}
        />
        {errors.championship_list_description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.championship_list_description.message}
          </p>
        )}
      </div>
    </div>
  );
};
export default BasicTab;
