import React from "react";
import {
  useMyNickname,
  useMyProfileImg,
  useMyUserIdx,
} from "../../../../4_Shared/lib/useMyInfo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type BoardComment = {
  player_list_idx: number;
  board_comment_idx: number;
  player_list_nickname: string;
  board_comment_content: string;
  board_comment_created_at: string;
  board_comment_updated_at: string;
  player_list_profile_image: string | null;
};

interface CommentSectionProps {
  initialComments: BoardComment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ initialComments }) => {
  const [comments, setComments] =
    React.useState<BoardComment[]>(initialComments);

  const [myIdx] = useMyUserIdx();
  const [myNickname] = useMyNickname();
  const [myProfileImage] = useMyProfileImg();

  const commentSchema = yup
    .object({
      content: yup
        .string()
        .required("댓글을 입력해주세요.")
        .max(100, "댓글은 100자 이하로 입력해야 합니다."),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ content: string }>({
    resolver: yupResolver(commentSchema),
  });

  /* 댓글 추가 */
  const onSubmitNew = (data: { content: string }) => {
    handleAddComment(data);
    reset();
  };

  const handleAddComment = (data: { content: string }) => {
    const text = data.content.trim();
    if (!myIdx || !myNickname) {
      alert("로그인 후 댓글을 작성해주세요.");
      return;
    }
    const newId = Math.max(0, ...comments.map((c) => c.board_comment_idx)) + 1;
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    setComments([
      ...comments,
      {
        player_list_idx: myIdx,
        board_comment_idx: newId,
        player_list_nickname: myNickname,
        board_comment_content: text,
        board_comment_created_at: now,
        board_comment_updated_at: now,
        player_list_profile_image: myProfileImage,
      },
    ]);
  };

  /* 댓글 수정 */
  const handleEditComment = (id: number, body: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.board_comment_idx === id ? { ...c, board_comment_content: body } : c
      )
    );
    setEditingId(null);
    setCommentInput("");
  };

  /* 댓글 삭제 */
  const handleDeleteComment = (id: number) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?"))
      setComments((prev) => prev.filter((c) => c.board_comment_idx !== id));
  };
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [commentInput, setCommentInput] = React.useState("");

  return (
    <div className="pt-6 border-t border-[#262b40]">
      <h3 className="text-lg font-medium mb-4 text-gray-200">
        댓글 {comments.length}개
      </h3>

      {/* 새 댓글 입력 */}
      <form onSubmit={handleSubmit(onSubmitNew)} className="mb-6">
        <textarea
          {...register("content")}
          placeholder="댓글을 작성하세요..."
          className="w-full bg-[#262b40] border border-[#262b40] rounded p-3 text-gray-200 mb-1 focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mb-2">{errors.content.message}</p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-[#2f80ed] hover:bg-[#1f6fe5] text-white">
            댓글 작성
          </button>
        </div>
      </form>

      {/* 댓글 목록 */}
      <section className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            첫 댓글을 작성해보세요!
          </p>
        ) : (
          comments.slice(0, 40).map((comment) => (
            <div
              key={comment.board_comment_idx}
              className="p-4 border-b border-[#262b40]">
              {/* 작성자 헤더 */}
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#262b40] overflow-hidden flex items-center justify-center text-gray-300">
                  {comment.player_list_profile_image ? (
                    <img
                      src={comment.player_list_profile_image}
                      alt={comment.player_list_nickname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    comment.player_list_nickname.charAt(0)
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-300">
                    {comment.player_list_nickname}
                  </p>
                  <p className="text-xs text-gray-500">
                    {comment.board_comment_created_at}
                  </p>
                </div>
              </div>

              {/* 본문 or 수정 모드 */}
              {editingId === comment.board_comment_idx ? (
                <div className="space-y-3 mt-3">
                  <textarea
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="w-full bg-transparent border border-[#262b40] p-2 text-gray-200 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2 justify-end">
                    <button
                      className="text-[#2f80ed] hover:underline"
                      onClick={() =>
                        handleEditComment(
                          comment.board_comment_idx,
                          commentInput
                        )
                      }>
                      수정 완료
                    </button>
                    <button
                      className="text-[#c9ced8] hover:underline"
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
                    {comment.board_comment_content}
                  </p>
                  {myIdx === comment.player_list_idx && (
                    <div className="flex space-x-2 mt-3 justify-end">
                      <button
                        className="text-[#c9ced8] hover:underline"
                        onClick={() => {
                          setEditingId(comment.board_comment_idx);
                          setCommentInput(comment.board_comment_content);
                        }}>
                        수정
                      </button>
                      <button
                        className="text-[#ff5353] hover:underline"
                        onClick={() =>
                          handleDeleteComment(comment.board_comment_idx)
                        }>
                        삭제
                      </button>
                    </div>
                  )}
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
  );
};

export default CommentSection;
