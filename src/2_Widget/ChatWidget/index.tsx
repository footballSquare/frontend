import { FormProvider, useForm } from "react-hook-form";
import { useAuthStore } from "../../4_Shared/lib/useMyInfo";
import closeIcon from "../../4_Shared/assets/svg/close.svg";
import messageIcon from "../../4_Shared/assets/svg/message-circle.svg";
import useSocketHandler from "./model/useSocketHandler";
import useFloatExpandedHandelr from "./model/useFloatExpandedHandelr";
import ChatBody from "./ui/ChatBody";

const ChatWidget = (props: ChatWidgetProps) => {
  const { isPage = false } = props;
  const myProfile = useAuthStore((state) => state.profileImg);
  const myNickname = useAuthStore((state) => state.nickname);
  const method = useForm<ChatFormData>();
  const { reset } = method;
  const { isExpanded, toggleExpanded, isFloating, toggleIsFloating } =
    useFloatExpandedHandelr();

  const {
    connectionStatus,
    chatLog,
    sendMessage,
    error,
    messagesEndRef,
    unreadCount,
    setUnreadCount,
  } = useSocketHandler({ reset, isFloating, isExpanded });

  // isPage  true  && isFloating true   →  렌더 X
  // isPage  false && isFloating false  →  렌더 X
  if ((isPage && isFloating) || (!isPage && !isFloating)) {
    return null;
  }

  // 채팅을 화면에 표시 모드가 아닌 경우 (인라인)
  return (
    <div>
      <FormProvider {...method}>
        {isPage && !isFloating ? (
          <div className="bg-gray-900 border border-gray-700/50 w-full h-[80vh] rounded-lg shadow-lg flex flex-col overflow-hidden transition-all duration-200 relative touch-none select-none">
            {/* 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    connectionStatus === "연결됨"
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}></div>
                <h3 className="font-semibold text-gray-100">{`탐 채팅방`}</h3>
                <span className="text-xs text-gray-400">
                  ({connectionStatus})
                </span>
                <button
                  onClick={toggleIsFloating}
                  className="px-2 py-1 ml-2 bg-gray-700/50 hover:bg-gray-600 text-xs text-white rounded transition-all">
                  {isFloating ? "채팅을 화면에서 제거" : "채팅을 화면에 고정"}
                </button>
              </div>
            </div>
            <ChatBody
              error={error}
              chatLog={chatLog}
              myNickname={myNickname}
              myProfile={myProfile}
              messagesEndRef={messagesEndRef}
              connectionStatus={connectionStatus}
              sendMessage={sendMessage}
            />
          </div>
        ) : (
          <div>
            {/* 모바일에서 채팅창이 확장되면 뒤 배경을 살짝 어둡게 */}
            {isExpanded && (
              <div
                onClick={toggleExpanded}
                className="fixed inset-0 bg-black/40 md:hidden"
              />
            )}
            <div className="fixed bottom-6 right-6 touch-none select-none">
              {/* 채팅을 화면에 표시 버튼 */}
              {!isExpanded && (
                <button
                  onClick={() => {
                    toggleExpanded();
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
                <div className="bg-gray-900  border border-gray-700/50 h-[600px] w-[400px] max-w-[calc(100vw-2rem)] max-h-[90vh] rounded-lg shadow-2xl flex flex-col transition-all duration-200 md:h-[600px] md:w-[400px] relative">
                  {/* 헤더 */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800 rounded-t-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full animate-pulse ${
                          connectionStatus === "연결됨"
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}></div>
                      <h3 className="font-semibold text-gray-100">{`팀 채팅방`}</h3>
                      <span className="text-xs text-gray-400">
                        ({connectionStatus})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* 모드 전환: 채팅을 화면에 표시 ➔ 채팅을 화면에서 제거 */}
                      <button
                        onClick={toggleIsFloating}
                        title="채팅페이지에서 다시 설정 가능합니다"
                        className="px-2 py-1 bg-gray-700/50 hover:bg-gray-600 text-xs text-white rounded transition-all">
                        채팅을 화면에서 제거
                      </button>
                      {/* 닫기: 창 축소 */}
                      <button
                        onClick={toggleExpanded}
                        className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors">
                        <img src={closeIcon} alt="닫기" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <ChatBody
                    error={error}
                    chatLog={chatLog}
                    myNickname={myNickname}
                    myProfile={myProfile}
                    messagesEndRef={messagesEndRef}
                    connectionStatus={connectionStatus}
                    sendMessage={sendMessage}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </FormProvider>
    </div>
  );
};

export default ChatWidget;
