import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Mode = "edit" | "read";

interface Post {
  id: number;
  category: string;
  title: string;
  body: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
  avatar?: string | null;
}

interface Comment {
  id: number;
  author: string;
  body: string;
  createdAt: string;
  avatar?: string | null;
}

const postSchema = yup.object({
  category: yup.string().required("말머리를 선택해주세요"),
  title: yup
    .string()
    .required("제목을 입력해주세요")
    .max(50, "제목은 50자 이하로 입력해주세요"),
  body: yup
    .string()
    .required("내용을 입력해주세요")
    .max(6000, "내용은 6000자 이하로 입력해주세요"),
  image: yup
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
});

interface PostFormFields {
  category: string;
  title: string;
  body: string;
  image?: FileList;
}

const Post: React.FC = () => {
  const { mode } = useParams<{ mode: Mode }>();
  return mode === "edit" ? <PostEditor /> : <PostDetail />;
};

const PostEditor: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<PostFormFields>({
    resolver: yupResolver(postSchema),
    defaultValues: { category: "", title: "", body: "" },
  });

  const imageFile = watch("image")?.[0];
  const [preview, setPreview] = useState<string>();

  React.useEffect(() => {
    if (!imageFile) return setPreview(undefined);
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const onSubmit = (data: PostFormFields) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("title", data.title);
    formData.append("body", data.body);
    if (data.image?.[0]) formData.append("image", data.image[0]);
    // TODO: API 호출
    navigate(-1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-16 space-y-12 text-[#e1e4ea]">
      <h1 className="text-3xl font-semibold mb-6 text-gray-100">게시글 작성</h1>

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
            <option value="notice">공지</option>
            <option value="free">자유</option>
          </select>
          {errors.category && (
            <p className="text-red-400 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300">
            제목
          </label>
          <input
            id="title"
            {...register("title")}
            className="bg-[#1b1f2e] border border-[#262b40] rounded p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
            placeholder="제목을 입력하세요 (50자 이하)"
          />
          {errors.title && (
            <p className="text-red-400 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-300">
            내용
          </label>
          <textarea
            id="body"
            {...register("body")}
            className="bg-[#1b1f2e] border border-[#262b40] rounded p-2.5 w-full h-72 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
            placeholder="내용을 입력하세요 (6000자 이하)"
          />
          {errors.body && (
            <p className="text-red-400 text-sm">{errors.body.message}</p>
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
                name="image"
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
          {errors.image && (
            <p className="text-red-400 text-sm">
              {errors.image.message as string}
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
            작성 완료
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

const PostDetail: React.FC = () => {
  const navigate = useNavigate();
  // --- dummy response shaped like real API ---
  const dummyData = {
    board: {
      board: {
        player: {
          player_list_idx: 3,
          player_list_nickname: "KFPL운영자",
          player_list_profile_image: null,
        },
        comments: [
          {
            player_list_idx: 10,
            board_comment_idx: 1,
            player_list_nickname: "차범근",
            board_comment_content: "좋습니다.",
            board_comment_created_at: "2025-03-18T04:17:41.86784",
            board_comment_updated_at: "2025-03-18T04:17:41.86784",
            player_list_profile_image:
              "https://dummyimage.com/150x150/000/fff&text=차범근",
          },
          {
            player_list_idx: 11,
            board_comment_idx: 2,
            player_list_nickname: "기성용",
            board_comment_content: "뭐가요?",
            board_comment_created_at: "2025-03-18T04:25:03.5149",
            board_comment_updated_at: "2025-03-18T04:25:03.5149",
            player_list_profile_image:
              "https://dummyimage.com/150x150/000/fff&text=기성용",
          },
        ],
        board_list_idx: 3,
        board_list_img: [
          "https://footballsquare-evidance-img.s3.ap-northeast-2.amazonaws.com/board/1742270153277-images__2__.jpg",
        ],
        board_list_title: '"게시글을 수정하였습니다"',
        board_category_idx: 1,
        board_list_content: '"수정된 커뮤니티 게시판 글 입니다."',
        board_list_likecount: 0,
        board_list_created_at: "2025-03-18T03:36:42.116981",
        board_list_updated_at: "2025-03-18T03:55:53.412586",
        board_list_view_count: 0,
      },
    },
  } as const;
  const board = dummyData.board.board;

  const [post] = useState<Post>({
    id: board.board_list_idx,
    category: board.board_category_idx === 1 ? "notice" : "free",
    title: board.board_list_title.replace(/\"/g, ""),
    body: board.board_list_content.replace(/\"/g, ""),
    imageUrl: board.board_list_img?.[0] ?? "",
    author: board.player.player_list_nickname,
    avatar: board.player.player_list_profile_image,
    createdAt: board.board_list_created_at,
  });

  const [comments, setComments] = useState<Comment[]>(
    board.comments.map((c) => ({
      id: c.board_comment_idx,
      author: c.player_list_nickname,
      body: c.board_comment_content,
      createdAt: c.board_comment_created_at,
      avatar: c.player_list_profile_image,
    }))
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleDeletePost = () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      // TODO: API 삭제
      navigate(-1);
    }
  };

  const handleEditComment = (id: number, body: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, body } : c)));
    setEditingId(null);
    setCommentInput("");
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newId = Math.max(0, ...comments.map((c) => c.id)) + 1;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    setComments([
      ...comments,
      {
        id: newId,
        author: "현재 사용자", // 실제로는 로그인된 사용자 정보
        body: newComment,
        createdAt: formattedDate,
      },
    ]);

    setNewComment("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-16 space-y-12 text-[#e1e4ea]">
      {/* 게시글 헤더 */}
      <div className="space-y-3 border-b border-[#262b40] pb-6">
        <div className="flex justify-between items-center">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
            {post.category === "notice" ? "공지" : "자유"}
          </span>
          <p className="text-sm text-gray-400">{post.createdAt}</p>
        </div>

        <h1 className="text-3xl font-bold text-gray-100">{post.title}</h1>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#262b40] overflow-hidden flex items-center justify-center text-gray-300">
            {post.avatar ? (
              <img
                src={post.avatar}
                alt={post.author}
                className="w-full h-full object-cover"
              />
            ) : (
              post.author.charAt(0)
            )}
          </div>
          <p className="text-gray-300">{post.author}</p>
        </div>
      </div>

      {/* 게시글 본문 */}
      <div className="space-y-6">
        <p className="whitespace-pre-wrap leading-relaxed text-gray-300 min-h-[200px]">
          {post.body}
        </p>

        {post.imageUrl && (
          <div className="p-2 bg-[#1b1f2e] border border-[#262b40] rounded">
            <img
              src={post.imageUrl}
              alt="게시글 이미지"
              className="max-h-96 mx-auto rounded"
            />
          </div>
        )}
      </div>

      {/* 게시글 작업 버튼 */}
      <div className="flex space-x-3 pt-2">
        <button
          className="text-[#2f80ed] hover:underline cursor-pointer"
          onClick={() => navigate("/post/edit")}>
          수정
        </button>
        <button
          className="text-[#ff5353] hover:underline cursor-pointer"
          onClick={handleDeletePost}>
          삭제
        </button>
        <button
          className="text-[#c9ced8] hover:underline cursor-pointer ml-auto"
          onClick={() => navigate(-1)}>
          목록
        </button>
      </div>

      {/* 댓글 작성 */}
      <div className="pt-6 border-t border-[#262b40]">
        <h3 className="text-lg font-medium mb-4 text-gray-200">
          댓글 {comments.length}개
        </h3>

        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성하세요..."
            className="w-full bg-[#262b40] border border-[#262b40] rounded p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
            rows={3}
          />
          <div className="flex justify-end">
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className={`px-4 py-2 rounded ${
                newComment.trim()
                  ? "bg-[#2f80ed] hover:bg-[#1f6fe5] text-white"
                  : "bg-[#2a2e3d] text-gray-400 cursor-not-allowed"
              }`}>
              댓글 작성
            </button>
          </div>
        </div>

        {/* 댓글 목록 */}
        <section className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-gray-400 py-6">
              첫 댓글을 작성해보세요!
            </p>
          ) : (
            comments.slice(0, 40).map((c) => (
              <div key={c.id} className="p-4 border-b border-[#262b40]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#262b40] overflow-hidden flex items-center justify-center text-gray-300">
                      {c.avatar ? (
                        <img
                          src={c.avatar}
                          alt={c.author}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        c.author.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-300">{c.author}</p>
                      <p className="text-xs text-gray-500">{c.createdAt}</p>
                    </div>
                  </div>
                </div>

                {editingId === c.id ? (
                  <div className="space-y-3 mt-3">
                    <textarea
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className="w-full bg-transparent border border-[#262b40] p-2 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex space-x-2 justify-end">
                      <button
                        className="text-[#2f80ed] hover:underline cursor-pointer"
                        onClick={() => handleEditComment(c.id, commentInput)}>
                        수정 완료
                      </button>
                      <button
                        className="text-[#c9ced8] hover:underline cursor-pointer"
                        onClick={() => {
                          setEditingId(null);
                          setCommentInput("");
                        }}>
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="whitespace-pre-wrap text-gray-300">
                      {c.body}
                    </p>
                    <div className="flex space-x-2 mt-3 justify-end">
                      <button
                        className="text-[#c9ced8] hover:underline cursor-pointer"
                        onClick={() => {
                          setEditingId(c.id);
                          setCommentInput(c.body);
                        }}>
                        수정
                      </button>
                      <button
                        className="text-[#ff5353] hover:underline cursor-pointer"
                        onClick={() => {
                          if (
                            window.confirm("정말로 이 댓글을 삭제하시겠습니까?")
                          ) {
                            setComments((prev) =>
                              prev.filter((cc) => cc.id !== c.id)
                            );
                          }
                        }}>
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {comments.length > 40 && (
            <button className="px-4 py-2 bg-[#1b1f2e] hover:bg-[#262b40] text-gray-300 rounded w-full border border-[#262b40] transition-colors">
              댓글 더보기
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default Post;
