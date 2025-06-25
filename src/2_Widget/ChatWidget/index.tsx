import React from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../4_Shared/lib/useMyInfo";
import DefaultProfile from "../../4_Shared/components/DefaultProfile";
import sendIcon from "../../4_Shared/assets/svg/send.svg";
import closeIcon from "../../4_Shared/assets/svg/close.svg";
import messageIcon from "../../4_Shared/assets/svg/message-circle.svg";
import useSocketHandler from "./model/useSocketHandler";
import { utcFormatter } from "../../4_Shared/lib/utcFormatter";
import loadingIcon from "../../4_Shared/assets/svg/loading.svg";
import useGetChatHistoryHandler from "./model/useGetChatHistoryHandler";

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

  const { displayedMessages, mappedChatHistory, pageRef, loading } =
    useGetChatHistoryHandler({ chatLog, messagesEndRef });

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
              {/* 과거 히스토리 메시지 */}
              {mappedChatHistory.map((msg: TeamChatMessage, index: number) => {
                const isOwn = msg.player_list_nickname === myNickname;
                return (
                  <div
                    key={`history-${msg.team_chat_message_idx}-${index}`}
                    className={`flex ${
                      isOwn ? "justify-end" : "justify-start"
                    }`}>
                    <div
                      className={`max-w-[70%] ${
                        isOwn
                          ? "bg-grass/50 text-white rounded-lg rounded-br-sm"
                          : "bg-gray-700/70 text-gray-100 rounded-lg rounded-bl-sm"
                      } px-4 py-2 shadow-sm`}>
                      {!isOwn && (
                        <div className="flex items-center gap-2 mb-1">
                          <DefaultProfile
                            src={msg.player_list_profile_image}
                            nickname={msg.player_list_nickname}
                            width="24px"
                            height="24px"
                            textSize="12px"
                          />
                          <span className="text-xs text-gray-300 font-medium">
                            {msg.player_list_nickname}
                          </span>
                        </div>
                      )}
                      <div className="text-sm leading-relaxed">
                        {msg.team_chat_message_content}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          isOwn ? "text-gray-200" : "text-gray-400"
                        }`}>
                        {utcFormatter(msg.team_chat_message_created_at)}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* '이전 기록' 구분선 */}
              {mappedChatHistory.length > 0 && chatLog.length > 0 && (
                <div className="flex items-center my-4">
                  <div className="flex-grow h-px bg-gray-600/50" />
                  <span className="mx-2 text-xs text-gray-400 whitespace-nowrap">
                    이전 기록
                  </span>
                  <div className="flex-grow h-px bg-gray-600/50" />
                </div>
              )}

              {/* 실시간 로그 메시지 */}
              {chatLog.map((msg: ChatMessageSocket, index) => {
                const isOwn = msg.sender_nickname === myNickname;
                return (
                  <div
                    key={`live-${
                      msg.sender_idx
                    }-${index}-${msg.timestamp?.valueOf?.()}`}
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
                      {!!msg.timestamp && (
                        <div
                          className={`text-xs mt-1 ${
                            isOwn ? "text-gray-200" : "text-gray-500"
                          }`}>
                          {utcFormatter(msg.timestamp.toISOString())}
                        </div>
                      )}
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
                {/* 과거 히스토리 메시지 */}
                {mappedChatHistory.map(
                  (msg: TeamChatMessage, index: number) => {
                    const isOwn = msg.player_list_nickname === myNickname;
                    return (
                      <div
                        key={`history-${msg.team_chat_message_idx}-${index}`}
                        className={`flex ${
                          isOwn ? "justify-end" : "justify-start"
                        }`}>
                        <div
                          className={`max-w-[70%] ${
                            isOwn
                              ? "bg-grass/50 text-white rounded-lg rounded-br-sm"
                              : "bg-gray-700/70 text-gray-100 rounded-lg rounded-bl-sm"
                          } px-4 py-2 shadow-sm`}>
                          {!isOwn && (
                            <div className="flex items-center gap-2 mb-1">
                              <DefaultProfile
                                src={msg.player_list_profile_image}
                                nickname={msg.player_list_nickname}
                                width="24px"
                                height="24px"
                                textSize="12px"
                              />
                              <span className="text-xs text-gray-300 font-medium">
                                {msg.player_list_nickname}
                              </span>
                            </div>
                          )}
                          <div className="text-sm leading-relaxed">
                            {msg.team_chat_message_content}
                          </div>
                          <div
                            className={`text-xs mt-1 ${
                              isOwn ? "text-gray-200" : "text-gray-400"
                            }`}>
                            {utcFormatter(msg.team_chat_message_created_at)}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}

                {/* '이전 기록' 구분선 */}
                {mappedChatHistory.length > 0 && chatLog.length > 0 && (
                  <div className="flex items-center my-4">
                    <div className="flex-grow h-px bg-gray-600/50" />
                    <span className="mx-2 text-xs text-gray-400 whitespace-nowrap">
                      이전 기록
                    </span>
                    <div className="flex-grow h-px bg-gray-600/50" />
                  </div>
                )}

                {/* 실시간 로그 메시지 */}
                {chatLog.map((msg: ChatMessageSocket, index) => {
                  const isOwn = msg.sender_nickname === myNickname;
                  return (
                    <div
                      key={`live-${
                        msg.sender_idx
                      }-${index}-${msg.timestamp?.valueOf?.()}`}
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
                        {!!msg.timestamp && (
                          <div
                            className={`text-xs mt-1 ${
                              isOwn ? "text-gray-200" : "text-gray-500"
                            }`}>
                            {utcFormatter(msg.timestamp.toISOString())}
                          </div>
                        )}
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
