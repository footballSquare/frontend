import React from "react";
import io, { Socket } from "socket.io-client";
import { useAuthStore, useIsLogin } from "../../../4_Shared/lib/useMyInfo";
import { useCookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_URL;

const useSocketHandler = (
  props: UseSocketHandlerProps
): UseSocketHandlerReturn => {
  const { reset, isFloating, isExpanded } = props;
  const [isLogin] = useIsLogin();
  const myNickname = useAuthStore((state) => state.nickname);
  const [cookies] = useCookies(["access_token"]);
  const accessToken = cookies.access_token;
  const [chatLog, setChatLog] = React.useState<ChatMessage[]>([]);
  const socketRef = React.useRef<Socket | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const [connectionStatus, setConnectionStatus] =
    React.useState<string>("연결 중...");
  const [error, setError] = React.useState<string>("");
  const [unreadCount, setUnreadCount] = React.useState(0);

  // 소켓 연결 및 이벤트 처리
  React.useEffect(() => {
    if (!isLogin) {
      setError("로그인이 필요합니다.");
      setConnectionStatus("인증 실패");
      return;
    }

    // 소켓 연결
    const socket = io(API_URL, {
      path: "/socket.io",
      transports: ["websocket"],
      auth: {
        token: accessToken,
      },
    });

    socketRef.current = socket;

    // 연결 성공
    socket.on("connect", () => {
      setConnectionStatus("연결됨");
      setError("");
      socket.emit("join");
      // 이전 채팅 기록 요청 (선택적)
      socket.emit("get_messages", { limit: 50 }); // 최근 50개 메시지 요청
    });

    // 연결 에러
    socket.on("connect_error", (err) => {
      setConnectionStatus("연결 실패");
      setError(err.message || "소켓 연결에 실패했습니다.");
    });

    // join 에러
    socket.on("join_error", (err: ErrorResponse) => {
      setError(err.message);
      setConnectionStatus("입장 실패");
    });

    // join 성공 (서버에서 이전 메시지와 함께 응답할 수 있음)
    socket.on("join_success", (data: JoinSuccessResponse) => {
      if (data.messages && Array.isArray(data.messages)) {
        const messagesWithTimestamp = data.messages.map((msg: ChatMessage) => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
        }));
        setChatLog(messagesWithTimestamp);
      }
    });

    // notJoin 에러
    socket.on("notJoin_error", (err: ErrorResponse) => {
      setError(err.message);
    });

    // 메시지 에러
    socket.on("message_error", () => {
      setError("메시지 전송에 실패했습니다.");
    });

    // 메시지 수신
    socket.on("message", (data: ChatMessage) => {
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
      const messagesWithTimestamp = messages.map((msg) => ({
        ...msg,
        timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
      }));
      setChatLog(messagesWithTimestamp);
    });

    // 연결 해제
    socket.on("disconnect", () => {
      setConnectionStatus("연결 해제됨");
    });

    // 클린업
    return () => {
      socket.disconnect();
    };
  }, [accessToken, myNickname, isExpanded, isFloating]);

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

    socketRef.current.emit("message", {
      message: data.chatInput.trim(),
    });

    reset(); // 입력 필드 초기화
    setError(""); // 에러 메시지 초기화

    // 읽지 않은 메시지가 있다면 0으로 초기화
    if (unreadCount > 0) {
      setUnreadCount(0);
    }
  };

  return {
    connectionStatus,
    chatLog,
    sendMessage,
    error,
    messagesEndRef,
    unreadCount,
    setUnreadCount,
  };
};

export default useSocketHandler;
