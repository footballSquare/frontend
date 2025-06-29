import { Controller } from "react-hook-form";
import uploadIcon from "../../assets/svg/upload.svg";

const PostEditInput = (props: PostEditInputProps) => {
  const { register, registerType, errors, control } = props;

  return registerType === "title" ? (
    <div className="space-y-2">
      <label
        htmlFor="board_list_title"
        className="block text-sm font-medium text-gray-300">
        제목
      </label>
      <input
        id="board_list_title"
        {...register("board_list_title")}
        className="bg-gray-800 border border-gray-700 rounded p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
        placeholder="제목을 입력하세요 (50자 이하)"
      />
      {errors.board_list_title && (
        <p className="text-red-400 text-sm">
          {errors.board_list_title.message}
        </p>
      )}
    </div>
  ) : registerType === "img" ? (
    <div>
      <label className="block text-sm font-medium text-gray-300">이미지</label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col w-full h-28 border-2 border-dashed border-gray-700 rounded cursor-pointer hover:border-blue-500 transition-all bg-gray-800">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <img src={uploadIcon} className="w-[40px] h-[40px]" />
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-medium">클릭하여 이미지 업로드</span>
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, GIF (최대 3MB)</p>
          </div>
          <Controller
            name="file"
            control={control}
            defaultValue={undefined}
            render={({ field: { onChange, ref } }) => (
              <input
                id="file"
                type="file"
                accept="image/*"
                ref={ref}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file); // ✅ 폼 상태에 File 주입
                }}
              />
            )}
          />
        </label>
      </div>
      {errors.file && (
        <p className="text-red-400 text-sm">{errors.file.message as string}</p>
      )}
    </div>
  ) : registerType === "content" ? (
    <div>
      <label
        htmlFor="board_list_content"
        className="block text-sm font-medium text-gray-300">
        내용
      </label>
      <textarea
        id="board_list_content"
        {...register("board_list_content")}
        className="bg-gray-800 border border-gray-700 rounded p-2.5 w-full h-72 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
        placeholder="내용을 입력하세요 (6000자 이하)"
      />
      {errors.board_list_content && (
        <p className="text-red-400 text-sm">
          {errors.board_list_content.message}
        </p>
      )}
    </div>
  ) : null;
};
export default PostEditInput;
