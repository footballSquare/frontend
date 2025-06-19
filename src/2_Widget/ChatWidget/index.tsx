import React from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useMyProfileImg, useMyNickname } from "../../4_Shared/lib/useMyInfo";
import DefaultProfile from "../../4_Shared/components/DefaultProfile";
import sendIcon from "../../4_Shared/assets/svg/send.svg";
import closeIcon from "../../4_Shared/assets/svg/close.svg";
import messageIcon from "../../4_Shared/assets/svg/message-circle.svg";
import io, { Socket } from "socket.io-client";

interface ChatWidgetProps {
  roomName?: string;
  isFloating?: boolean;
}

interface ChatMessage {
  sender_idx: number;
  sender_nickname: string;
  sender_profile_image: string;
  message: string;
  timestamp?: Date;
}

interface ErrorResponse {
  status: number;
  message: string;
}

interface ChatFormData {
  chatInput: string;
}

interface JoinSuccessResponse {
  messages?: ChatMessage[];
}

const API_URL =
  import.meta.env.VITE_API_URL || "https://api.footballsquare.co.kr"; // API URL

const ChatWidget = (props: ChatWidgetProps) => {
  const { roomName, isFloating = false } = props;
  const [cookies] = useCookies(["access_token"]);
  const [myProfile] = useMyProfileImg();
  const [myNickname] = useMyNickname();
  const { register, handleSubmit, reset } = useForm<ChatFormData>({
    mode: "onChange",
  });

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [chatLog, setChatLog] = React.useState<ChatMessage[]>([]);
  const [connectionStatus, setConnectionStatus] =
    React.useState<string>("연결 중...");
  const [error, setError] = React.useState<string>("");
  const socketRef = React.useRef<Socket | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // 소켓 연결 및 이벤트 처리
  React.useEffect(() => {
    if (!cookies.access_token) {
      setError("로그인이 필요합니다.");
      setConnectionStatus("인증 실패");
      return;
    }

    // 소켓 연결
    const socket = io(API_URL, {
      path: "/socket.io",
      transports: ["websocket"],
      auth: {
        token: cookies.access_token,
      },
    });

    socketRef.current = socket;

    // 모든 소켓 이벤트 디버깅용
    socket.onAny((eventName, ...args) => {
      console.log(`소켓 이벤트 수신: ${eventName}`, args);
    });

    // 연결 성공
    socket.on("connect", () => {
      console.log("소켓 연결됨");
      console.log("소켓 ID:", socket.id);
      setConnectionStatus("연결됨");
      setError("");

      console.log("join 이벤트 전송 중...");
      socket.emit("join");

      console.log("이전 메시지 요청 중...");
      // 이전 채팅 기록 요청 (선택적)
      socket.emit("get_messages", { limit: 50 }); // 최근 50개 메시지 요청
    });

    // 연결 에러
    socket.on("connect_error", (err) => {
      console.error("연결 에러:", err);
      setConnectionStatus("연결 실패");
      setError("서버 연결에 실패했습니다.");
    });

    // join 에러
    socket.on("join_error", (err: ErrorResponse) => {
      console.error("join 에러:", err);
      setError(err.message);
      setConnectionStatus("입장 실패");
    });

    // join 성공 (서버에서 이전 메시지와 함께 응답할 수 있음)
    socket.on("join_success", (data: JoinSuccessResponse) => {
      console.log("join 성공:", data);
      if (data.messages && Array.isArray(data.messages)) {
        console.log(`${data.messages.length}개의 이전 메시지 로드됨`);
        const messagesWithTimestamp = data.messages.map((msg: ChatMessage) => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
        }));
        setChatLog(messagesWithTimestamp);
      }
    });

    // notJoin 에러
    socket.on("notJoin_error", (err: ErrorResponse) => {
      console.error("notJoin 에러:", err);
      setError(err.message);
    });

    // 메시지 에러
    socket.on("message_error", (err: ErrorResponse) => {
      console.error("메시지 에러:", err);
      setError("메시지 전송에 실패했습니다.");
    });

    // 메시지 수신
    socket.on("message", (data: ChatMessage) => {
      console.log("새 메시지 수신:", data);
      const messageWithTimestamp = {
        ...data,
        timestamp: new Date(),
      };
      setChatLog((prev) => [...prev, messageWithTimestamp]);

      // 채팅이 닫혀있고 내가 보낸 메시지가 아니면 읽지 않은 메시지 수 증가
      if (!isExpanded && isFloating && data.sender_nickname !== myNickname) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    // 이전 메시지들 수신
    socket.on("messages", (messages: ChatMessage[]) => {
      console.log("이전 메시지들 수신:", messages);
      console.log(`총 ${messages.length}개의 메시지`);
      const messagesWithTimestamp = messages.map((msg) => ({
        ...msg,
        timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
      }));
      setChatLog(messagesWithTimestamp);
    });

    // 메시지 기록 요청 에러
    socket.on("get_messages_error", (err: ErrorResponse) => {
      console.error("메시지 기록 요청 에러:", err);
      // 에러가 발생해도 채팅은 계속 사용할 수 있도록 로그만 출력
    });

    // 연결 해제
    socket.on("disconnect", (reason) => {
      console.log("연결 해제:", reason);
      setConnectionStatus("연결 해제됨");
    });

    // 클린업
    return () => {
      socket.disconnect();
    };
  }, [cookies.access_token, myNickname, isExpanded, isFloating]);

  // 메시지 목록이 업데이트될 때 스크롤을 맨 아래로
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const sendMessage = (data: ChatFormData) => {
    if (!socketRef.current) {
      setError("소켓이 연결되지 않았습니다.");
      return;
    }

    if (!data.chatInput.trim()) {
      setError("메시지를 입력해주세요.");
      return;
    }

    console.log("채팅 전송 시도:", data.chatInput);
    console.log("소켓 연결 상태:", socketRef.current?.connected);
    socketRef.current.emit("message", {
      message: data.chatInput.trim(),
    });
    console.log("메시지 emit 완료");

    reset(); // 입력 필드 초기화
    setError(""); // 에러 메시지 초기화

    // 읽지 않은 메시지가 있다면 0으로 초기화
    if (unreadCount > 0) {
      setUnreadCount(0);
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setUnreadCount(0); // 채팅을 열면 읽지 않은 메시지 0으로 초기화
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 플로팅 모드가 아닌 경우 (인라인)
  if (!isFloating) {
    return (
      <div className="bg-gray-900 border border-gray-700/50 h-full rounded-lg shadow-lg flex flex-col transition-all duration-200 relative">
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {chatLog.length === 0 ? (
            <div className="text-gray-400 text-center text-sm mt-8">
              채팅 내역이 없습니다. 첫 번째 메시지를 보내보세요!
            </div>
          ) : (
            chatLog.map((msg, index) => {
              const isOwn = msg.sender_nickname === myNickname;
              return (
                <div
                  key={`${msg.sender_idx}-${index}`}
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
                    <div
                      className={`text-xs mt-1 ${
                        isOwn ? "text-gray-200" : "text-gray-500"
                      }`}>
                      {msg.timestamp ? formatTime(msg.timestamp) : ""}
                    </div>
                  </div>
                </div>
              );
            })
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
          onClick={handleExpand}
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
        <div className="bg-gray-900 border border-gray-700/50 h-[600px] w-[400px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] rounded-lg shadow-2xl flex flex-col transition-all duration-200 md:h-[600px] md:w-[400px] relative">
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {chatLog.length === 0 ? (
              <div className="text-gray-400 text-center text-sm mt-8">
                채팅 내역이 없습니다. 첫 번째 메시지를 보내보세요!
              </div>
            ) : (
              chatLog.map((msg, index) => {
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
                        {msg.timestamp ? formatTime(msg.timestamp) : ""}
                      </div>
                    </div>
                  </div>
                );
              })
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
