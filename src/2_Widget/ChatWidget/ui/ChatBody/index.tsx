import DefaultProfile from "../../../../4_Shared/components/DefaultProfile";

import loadingIcon from "../../../../4_Shared/assets/svg/loading.svg";
import sendIcon from "../../../../4_Shared/assets/svg/send.svg";
import { utcFormatter } from "../../../../4_Shared/lib/utcFormatter";
import useGetChatHistoryHandler from "../../model/useGetChatHistoryHandler";
import { useFormContext } from "react-hook-form";

const ChatBody = (props: ChatBodyProps) => {
  const {
    error,
    chatLog,
    myNickname,
    myProfile,
    messagesEndRef,
    connectionStatus,
    sendMessage,
  } = props;

  const { register, handleSubmit } = useFormContext<ChatFormData>();

  const { displayedMessages, mappedChatHistory, pageRef, loading } =
    useGetChatHistoryHandler({ chatLog, messagesEndRef });

  return (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {error && (
        <div className="px-4 py-2 bg-red-500/20 border-b border-red-500/30 text-red-300 text-sm">
          {error}
        </div>
      )}
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
            {mappedChatHistory.map((msg, index) => {
              const isOwn = msg.player_list_nickname === myNickname;
              return (
                <div
                  key={`history-${msg.team_chat_message_idx}-${index}`}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
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
            {mappedChatHistory.length > 0 && chatLog.length > 0 && (
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-600/50" />
                <span className="mx-2 text-xs text-gray-400 whitespace-nowrap">
                  이전 기록
                </span>
                <div className="flex-grow h-px bg-gray-600/50" />
              </div>
            )}
            {chatLog.map((msg, index) => {
              const isOwn = msg.sender_nickname === myNickname;
              return (
                <div
                  key={`live-${
                    msg.sender_idx
                  }-${index}-${msg.timestamp?.valueOf?.()}`}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
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
                    <div className="text-sm leading-relaxed">{msg.message}</div>
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
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="p-4 border-t border-gray-700/50 bg-gray-800">
        <div className="flex items-center gap-2">
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
  );
};

export default ChatBody;
