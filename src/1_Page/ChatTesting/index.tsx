import { useForm } from "react-hook-form";
import { useMyProfileImg, useMyNickname } from "../../4_Shared/lib/useMyInfo";
import { useCookies } from "react-cookie";
import io, { Socket } from "socket.io-client";
import React from "react";

const API_URL = import.meta.env.VITE_SERVER_URL; // API URL

interface ChatMessage {
  sender_idx: number;
  sender_nickname: string;
  sender_profile_image: string;
  message: string;
}

interface ErrorResponse {
  status: number;
  message: string;
}

const ChatTesting = () => {
  const [cookies] = useCookies(["access_token"]);
  const [myProfile] = useMyProfileImg();
  const [myNickname] = useMyNickname();
  const { register, handleSubmit, reset } = useForm<{ chatInput: string }>({
    mode: "onChange",
  });

  const [chatLog, setChatLog] = React.useState<ChatMessage[]>([]);
  const [connectionStatus, setConnectionStatus] =
    React.useState<string>("연결 중...");
  const [error, setError] = React.useState<string>("");
  const socketRef = React.useRef<Socket | null>(null);

  React.useEffect(() => {
    // 소켓 연결
    const socket = io(API_URL, {
      path: "/socket.io", // 명세서에 맞게 수정
      transports: ["websocket"], // websocket 권장
      auth: {
        token: cookies.access_token,
      },
    });

    socketRef.current = socket;

    // 연결 성공
    socket.on("connect", () => {
      console.log("소켓 연결됨");
      setConnectionStatus("연결됨");
      setError("");

      // 연결 후 즉시 join
      socket.emit("join");
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
      console.log("메시지 수신:", data);
      setChatLog((prev) => [...prev, data]);
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
  }, [cookies.access_token]);

  const sendMessage = (data: { chatInput: string }) => {
    if (!socketRef.current) {
      setError("소켓이 연결되지 않았습니다.");
      return;
    }

    if (!data.chatInput.trim()) {
      setError("메시지를 입력해주세요.");
      return;
    }

    console.log("채팅 전송:", data.chatInput);
    socketRef.current.emit("message", {
      message: data.chatInput.trim(),
    });

    reset(); // 입력 필드 초기화
    setError(""); // 에러 메시지 초기화
  };

  return (
    <div className="flex flex-col w-[60%] h-[600px]">
      {/* 상태 표시 */}
      <div className="bg-blue-100 p-2 text-sm">
        <span
          className={`font-medium ${
            connectionStatus === "연결됨" ? "text-green-600" : "text-red-600"
          }`}
        >
          상태: {connectionStatus}
        </span>
        {error && <span className="ml-4 text-red-600">에러: {error}</span>}
      </div>
      {/* 채팅 로그 */}
      <div className="bg-amber-200 flex-1 p-4 overflow-y-auto text-black">
        {chatLog.length === 0 ? (
          <div className="text-gray-500 text-center">채팅 내역이 없습니다.</div>
        ) : (
          chatLog.map((msg, index) => (
            <div key={index} className="mb-2 p-2 bg-white rounded shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={msg.sender_profile_image || "/default-avatar.png"}
                  alt="프로필"
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium text-sm">
                  {msg.sender_nickname}
                </span>
              </div>
              <div>{msg.message}</div>
            </div>
          ))
        )}
      </div>{" "}
      {/* 메시지 입력 */}
      <form
        className="flex items-center h-16 bg-gray-100 px-3 gap-3"
        onSubmit={handleSubmit(sendMessage)}
      >
        {/* 사용자 프로필 */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img
            src={myProfile || "/default-avatar.png"}
            alt="내 프로필"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {myNickname || "사용자"}
          </span>
        </div>

        <input
          className="flex-1 h-10 px-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          type="text"
          placeholder="채팅을 입력하세요..."
          {...register("chatInput", { required: "채팅 내용을 입력해주세요." })}
          disabled={connectionStatus !== "연결됨"}
        />
        <button
          type="submit"
          className="w-20 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          disabled={connectionStatus !== "연결됨"}
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default ChatTesting;
