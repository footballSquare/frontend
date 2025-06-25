import React from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../4_Shared/lib/useMyInfo";
import DefaultProfile from "../../4_Shared/components/DefaultProfile";
import sendIcon from "../../4_Shared/assets/svg/send.svg";
import closeIcon from "../../4_Shared/assets/svg/close.svg";
import messageIcon from "../../4_Shared/assets/svg/message-circle.svg";
import useSocketHandler from "./model/useSocketHandler";
import useGetTeamChatHistory from "../../3_Entity/Chat/useGetTeamChatHistory";
import useInfiniteScrollPaging from "../../4_Shared/model/useInfiniteScrollPaging";
import { utcFormatter } from "../../4_Shared/lib/utcFormatter";
import loadingIcon from "../../4_Shared/assets/svg/loading.svg";

const ChatWidget = (props: ChatWidgetProps) => {
  const { roomName, isFloating = false } = props;
  const myProfile = useAuthStore((state) => state.profileImg);
  const myNickname = useAuthStore((state) => state.nickname);
  const { register, handleSubmit, reset } = useForm<ChatFormData>({
    mode: "onChange",
  });
  const [isExpanded, setIsExpanded] = React.useState(false);

  const {
    connectionStatus,
    chatLog,
    sendMessage,
    error,
    messagesEndRef,
    unreadCount,
    setUnreadCount,
  } = useSocketHandler({ reset, isFloating, isExpanded });

  const [page, setPage] = React.useState<number>(0);
  const [chatHistory, hasMoreContent, loading] = useGetTeamChatHistory(page);
  const [pageRef] = useInfiniteScrollPaging(setPage, loading, hasMoreContent);

  /**
   * 팀 채팅 히스토리를 실시간 소켓 채팅 로그와 결합한다.
   * 서버에서 내려온 히스토리는 `chatHistory`(DB row) 형태이므로
   * 프론트에서 사용하는 메시지 형태로 매핑한다.
   */

  const mappedChatHistory = React.useMemo(
    () =>
      chatHistory
        .map((msg) => ({
          sender_idx: msg.player_list_idx,
          sender_nickname: msg.player_list_nickname,
          sender_profile_image: msg.player_list_profile_image,
          message: msg.team_chat_message_content,
          timestamp: new Date(msg.team_chat_message_created_at),
        }))
        // 오래된 순으로 정렬 (가장 오래된 → 최신)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()),
    [chatHistory]
  );

  /** 화면에 보여줄 최종 메시지 목록 = 과거 기록 + 소켓 실시간 메시지 */
  const displayedMessages = React.useMemo(
    () => [...mappedChatHistory, ...chatLog],
    [mappedChatHistory, chatLog]
  );

  React.useEffect(() => {
    // 최초 마운트
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [chatHistory]);

  React.useEffect(() => {
    // 새로운 실시간 메시지 수신 시
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  // 플로팅 모드가 아닌 경우 (인라인)
  if (!isFloating) {
    return (
      <div className="bg-gray-900 border border-gray-700/50 w-full max-h-[80vh] rounded-lg shadow-lg flex flex-col overflow-hidden transition-all duration-200 relative">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                connectionStatus === "연결됨" ? "bg-green-400" : "bg-red-400"
              }`}></div>
            <h3 className="font-semibold text-gray-100">
              {`${roomName} 채팅방`}
            </h3>
            <span className="text-xs text-gray-400">({connectionStatus})</span>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="px-4 py-2 bg-red-500/20 border-b border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* 메시지 영역 */}
        <div className="flex-1 min-h-0 overflow-y-scroll p-4 space-y-4 bg-gray-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {loading && displayedMessages.length === 0 ? (
            <div className="flex justify-center pt-8">
              <img
                src={loadingIcon}
                alt="로딩 중"
                className="w-8 h-8 animate-spin"
              />
            </div>
          ) : displayedMessages.length === 0 ? (
            <div className="text-gray-400 text-center text-sm mt-8">
              채팅 내역이 없습니다. 첫 번째 메시지를 보내보세요!
            </div>
          ) : (
            <>
              {/* 무한스크롤 sentinel — 최상단에 배치 */}
              <div ref={pageRef} />
              {loading && (
                <div className="flex justify-center my-2">
                  <img
                    src={loadingIcon}
                    alt="로딩 중"
                    className="w-8 h-8 animate-spin"
                  />
                </div>
              )}
              {displayedMessages.map((msg, index) => {
                const isOwn = msg.sender_nickname === myNickname;
                return (
                  <div
                    key={`${msg.sender_idx}-${index}`}
                    className={`flex ${
                      isOwn ? "justify-end" : "justify-start"
                    }`}>
                    <div
                      className={`max-w-[70%] ${
                        isOwn
                          ? "bg-grass/90 text-white rounded-lg rounded-br-sm"
                          : "bg-gray-800/80 text-gray-100 rounded-lg rounded-bl-sm"
                      } px-4 py-2 shadow-sm`}>
                      {!isOwn && (
                        <div className="flex items-center gap-2 mb-1">
                          <DefaultProfile
                            src={msg.sender_profile_image}
                            nickname={msg.sender_nickname}
                            width="24px"
                            height="24px"
                            textSize="12px"
                          />
                          <span className="text-xs text-gray-400 font-medium">
                            {msg.sender_nickname}
                          </span>
                        </div>
                      )}
                      <div className="text-sm leading-relaxed">
                        {msg.message}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          isOwn ? "text-gray-200" : "text-gray-500"
                        }`}>
                        {msg.timestamp
                          ? utcFormatter(
                              typeof msg.timestamp === "string"
                                ? msg.timestamp
                                : msg.timestamp.toISOString()
                            )
                          : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 입력 영역 */}
        <form
          onSubmit={handleSubmit(sendMessage)}
          className="p-4 border-t border-gray-700/50 bg-gray-800">
          <div className="flex items-center gap-2">
            {/* 내 프로필 이미지 */}
            <div className="flex-shrink-0">
              <DefaultProfile
                src={myProfile}
                nickname={myNickname || undefined}
                width="32px"
                height="32px"
                textSize="14px"
              />
            </div>
            <input
              {...register("chatInput", { required: "메시지를 입력해주세요." })}
              placeholder="메시지를 입력하세요..."
              disabled={connectionStatus !== "연결됨"}
              className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-grass/50 focus:border-grass text-gray-100 placeholder-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={connectionStatus !== "연결됨"}
              className="p-2.5 bg-grass/90 hover:bg-grass disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95">
              <img src={sendIcon} alt="전송" className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 플로팅 모드
  return (
    <div className="fixed bottom-6 right-6">
      {/* 플로팅 버튼 */}
      {!isExpanded && (
        <button
          onClick={() => {
            setIsExpanded(true);
            setUnreadCount(0); // 채팅을 열면 읽지 않은 메시지 0으로 초기화
          }}
          className="w-14 h-14 bg-grass hover:bg-grass/90 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95">
          <img src={messageIcon} alt="메시지" className="w-6 h-6" />
          {/* 읽지 않은 메시지 표시 */}
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}
        </button>
      )}

      {/* 확장된 채팅 창 */}
      {isExpanded && (
        <div className="bg-gray-900 border border-gray-700/50 h-[600px] w-[400px] max-w-[calc(100vw-2rem)] max-h-[90vh] rounded-lg shadow-2xl flex flex-col transition-all duration-200 md:h-[600px] md:w-[400px] relative">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full animate-pulse ${
                  connectionStatus === "연결됨" ? "bg-green-400" : "bg-red-400"
                }`}></div>
              <h3 className="font-semibold text-gray-100">
                {`${roomName} 채팅방`}
              </h3>
              <span className="text-xs text-gray-400">
                ({connectionStatus})
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors">
              <img src={closeIcon} alt="닫기" className="w-4 h-4" />
            </button>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="px-4 py-2 bg-red-500/20 border-b border-red-500/30 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* 메시지 영역 */}
          <div className="flex-1 min-h-0 overflow-y-scroll p-4 space-y-4 bg-gray-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {loading && displayedMessages.length === 0 ? (
              <div className="flex justify-center pt-8">
                <img
                  src={loadingIcon}
                  alt="로딩 중"
                  className="w-8 h-8 animate-spin"
                />
              </div>
            ) : displayedMessages.length === 0 ? (
              <div className="text-gray-400 text-center text-sm mt-8">
                채팅 내역이 없습니다. 첫 번째 메시지를 보내보세요!
              </div>
            ) : (
              <>
                {/* 무한스크롤 sentinel — 최상단에 배치 */}
                <div ref={pageRef} />
                {loading && (
                  <div className="flex justify-center my-2">
                    <img
                      src={loadingIcon}
                      alt="로딩 중"
                      className="w-8 h-8 animate-spin"
                    />
                  </div>
                )}
                {displayedMessages.map((msg, index) => {
                  const isOwn = msg.sender_nickname === myNickname;
                  return (
                    <div
                      key={`${msg.sender_idx}-${index}`}
                      className={`flex ${
                        isOwn ? "justify-end" : "justify-start"
                      }`}>
                      <div
                        className={`max-w-[70%] ${
                          isOwn
                            ? "bg-grass/90 text-white rounded-lg rounded-br-sm"
                            : "bg-gray-800/80 text-gray-100 rounded-lg rounded-bl-sm"
                        } px-4 py-2 shadow-sm`}>
                        {!isOwn && (
                          <div className="flex items-center gap-2 mb-1">
                            <DefaultProfile
                              src={msg.sender_profile_image}
                              nickname={msg.sender_nickname}
                              width="24px"
                              height="24px"
                              textSize="12px"
                            />
                            <span className="text-xs text-gray-400 font-medium">
                              {msg.sender_nickname}
                            </span>
                          </div>
                        )}
                        <div className="text-sm leading-relaxed">
                          {msg.message}
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            isOwn ? "text-gray-200" : "text-gray-500"
                          }`}>
                          {msg.timestamp
                            ? utcFormatter(
                                typeof msg.timestamp === "string"
                                  ? msg.timestamp
                                  : msg.timestamp.toISOString()
                              )
                            : ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <form
            onSubmit={handleSubmit(sendMessage)}
            className="p-4 border-t border-gray-700/50 bg-gray-800">
            <div className="flex items-center gap-2">
              {/* 내 프로필 이미지 */}
              <div className="flex-shrink-0">
                <DefaultProfile
                  src={myProfile}
                  nickname={myNickname || undefined}
                  width="32px"
                  height="32px"
                  textSize="14px"
                />
              </div>
              <input
                {...register("chatInput", {
                  required: "메시지를 입력해주세요.",
                })}
                placeholder="메시지를 입력하세요..."
                disabled={connectionStatus !== "연결됨"}
                className="flex-1 px-4 py-2.5 bg-gray-800/80 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-grass/50 focus:border-grass text-gray-100 placeholder-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={connectionStatus !== "연결됨"}
                className="p-2.5 bg-grass/90 hover:bg-grass disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95">
                <img src={sendIcon} alt="전송" className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
