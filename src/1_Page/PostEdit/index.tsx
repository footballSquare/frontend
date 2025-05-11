import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useGetBoardDetail from "../../3_Entity/Board/useGetBoardDetail";

const schema = yup
  .object({
    // 새 필드
    category: yup
      .number()
      .transform((v, o) => (o === "" ? undefined : v))
      .when("board_category_idx", {
        is: (val: unknown) => val === undefined || val === "",
        then: (s) =>
          s
            .typeError("게시판 종류를 선택해주세요")
            .required("게시판 종류를 선택해주세요"),
        otherwise: (s) => s.notRequired(),
      }),

    // 기존 필드(선택)
    board_category_idx: yup
      .number()
      .transform((v, o) => (o === "" ? undefined : v))
      .notRequired(),

    board_list_title: yup
      .string()
      .required("제목을 입력해주세요")
      .max(50, "제목은 50자 이하로 입력해주세요"),
    board_list_content: yup
      .string()
      .required("내용을 입력해주세요")
      .max(1000, "내용은 1000자 이하로 입력해주세요"),
    board_list_img: yup
      .mixed<FileList>()
      .test("fileSize", "3MB 이하만 업로드 가능합니다", (value) => {
        if (!value || value.length === 0) return true;
        return value[0].size <= 3 * 1024 * 1024;
      })
      .test(
        "fileCount",
        "이미지는 최대 1개만 업로드 가능합니다",
        (value) => !value || value.length <= 1
      ),
  })
  .required();

type PostFormFields = {
  category?: number;
  board_category_idx?: number;
  board_list_title: string;
  board_list_content: string;
  board_list_img?: FileList;
};

const PostEdit = () => {
  const navigate = useNavigate();

  // 1. 문자열로만 받기
  const { postId = "new" } = useParams<{ postId: string }>();
  // 2. 'new' 여부로 모드 결정
  const isEdit = postId !== "new";
  // 3. 수정 모드일 때만 숫자로 변환
  const numericPostId = isEdit ? Number(postId) : undefined;
  if (isEdit && Number.isNaN(numericPostId)) {
    // 잘못된 파라미터 → 404 처리 등
    navigate("/404");
  }
  // 4. 상세조회 훅 호출 (훅 시그니처를 number | undefined 받도록 하면 편리)
  const [boadDetail] = useGetBoardDetail(numericPostId as number);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<PostFormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      category: undefined,
      board_category_idx: undefined,
      board_list_title: "",
      board_list_content: "",
    },
  });

  React.useEffect(() => {
    reset({
      category: boadDetail?.board_category_idx,
      board_category_idx: boadDetail?.board_category_idx,
      board_list_title: boadDetail?.board_list_title,
      board_list_content: boadDetail?.board_list_content,
    });
    setPreview(boadDetail?.board_list_img);
  }, [boadDetail]);

  const imageFile = watch("board_list_img")?.[0];
  const [preview, setPreview] = useState<string>();

  React.useEffect(() => {
    if (!imageFile) return setPreview(undefined);
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const onSubmit = (data: PostFormFields) => {
    const formData = new FormData();
    formData.append(
      "category",
      String(data.category || data.board_category_idx)
    );
    formData.append("board_list_title", data.board_list_title);
    formData.append("board_list_content", data.board_list_content);
    if (data.board_list_img?.[0])
      formData.append("board_list_img", data.board_list_img[0]);
    if (isEdit && postId) {
      // TODO: PUT /posts/${postId} (게시글 수정)
    } else {
      // TODO: POST /posts (게시글 생성)
    }
    navigate(-1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-16 space-y-12 text-[#e1e4ea]">
      <h1 className="text-3xl font-semibold mb-6 text-gray-100">
        {isEdit ? "게시글 수정" : "게시글 작성"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300">
            말머리
          </label>
          <select
            id="category"
            {...register("category")}
            className="bg-[#1b1f2e] border border-[#262b40] rounded p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200">
            <option value="">말머리 선택</option>
            <option value="1">공지</option>
            <option value="2">자유</option>
          </select>
          {errors.category && (
            <p className="text-red-400 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="board_list_title"
            className="block text-sm font-medium text-gray-300">
            제목
          </label>
          <input
            id="board_list_title"
            {...register("board_list_title")}
            className="bg-[#1b1f2e] border border-[#262b40] rounded p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
            placeholder="제목을 입력하세요 (50자 이하)"
          />
          {errors.board_list_title && (
            <p className="text-red-400 text-sm">
              {errors.board_list_title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="board_list_content"
            className="block text-sm font-medium text-gray-300">
            내용
          </label>
          <textarea
            id="board_list_content"
            {...register("board_list_content")}
            className="bg-[#1b1f2e] border border-[#262b40] rounded p-2.5 w-full h-72 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
            placeholder="내용을 입력하세요 (6000자 이하)"
          />
          {errors.board_list_content && (
            <p className="text-red-400 text-sm">
              {errors.board_list_content.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            이미지
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-28 border-2 border-dashed border-[#262b40] rounded cursor-pointer hover:border-blue-500 transition-all bg-[#1b1f2e]">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-medium">클릭하여 이미지 업로드</span>
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF (최대 3MB)
                </p>
              </div>
              <Controller
                name="board_list_img"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                )}
              />
            </label>
          </div>
          {errors.board_list_img && (
            <p className="text-red-400 text-sm">
              {errors.board_list_img.message as string}
            </p>
          )}
        </div>

        {preview && (
          <div className="mt-4 p-2 bg-[#1b1f2e] border border-[#262b40] rounded">
            <img
              src={preview}
              alt="미리보기"
              className="max-h-64 mx-auto rounded"
            />
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="px-4 py-1.5 text-sm font-medium text-[#2f80ed] border border-[#2f80ed] hover:bg-[#2f80ed] hover:text-white rounded transition-colors">
            {isEdit ? "수정 완료" : "작성 완료"}
          </button>
          <button
            type="button"
            className="px-4 py-1.5 text-sm font-medium text-[#c9ced8] border border-[#2a2e3d] hover:bg-[#242834] rounded transition-colors"
            onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
