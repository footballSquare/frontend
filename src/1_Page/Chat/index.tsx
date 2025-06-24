import React from "react";
import { useIsLogin, useAuthStore } from "../../4_Shared/lib/useMyInfo";
import DefaultProfile from "../../4_Shared/components/DefaultProfile";
import ChatWidget from "../../2_Widget/ChatWidget";
import closeIcon from "../../4_Shared/assets/svg/close.svg";
import menuIcon from "../../4_Shared/assets/svg/menu.svg";
import { useNavigate } from "react-router-dom";

const rooms = [{ id: "team-normal", name: "팀 일반", unread: 0 }];

const ChatPage = () => {
  const [selectedRoomId, setSelectedRoomId] = React.useState(rooms[0].id);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [isLogin] = useIsLogin();
  const myProfileImg = useAuthStore((state) => state.profileImg);
  const myNickname = useAuthStore((state) => state.nickname);
  const navigate = useNavigate();

  return !isLogin ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center max-w-xs w-full border border-gray-700/40">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          로그인이 필요합니다
        </h2>
        <p className="text-gray-300 text-center mb-8 text-base leading-relaxed">
          채팅 기능을 이용하려면 로그인이 필요합니다.
          <br />
          로그인 후 다양한 채팅방에 참여해보세요!
        </p>
        <button
          className="px-6 py-3 bg-grass text-white rounded-lg text-lg font-semibold shadow hover:bg-grass/80 transition-colors w-full"
          onClick={() => navigate("/login")}>
          로그인 하러 가기
        </button>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex bg-gray-900">
      {/* 사이드바 */}
      <div
        className={`
          w-80 bg-gray-800 border-r border-gray-700/50 
          flex flex-col transition-transform duration-300 relative
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative fixed inset-y-0 left-0
        `}>
        <div className="p-6 border-b border-gray-700/50 bg-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="w-3 h-3 bg-grass rounded-full animate-pulse"></div>
              채팅방
            </h2>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
              <img src={closeIcon} alt="닫기" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => {
                setSelectedRoomId(room.id);
                setIsMobileSidebarOpen(false);
              }}
              className={`
                  w-full p-4 text-left transition-all duration-200 
                  border-b border-gray-700/30 hover:bg-gray-700/50
                  ${
                    selectedRoomId === room.id
                      ? "bg-grass/20 border-l-4 border-l-grass"
                      : "hover:border-l-4 hover:border-l-grass/50"
                  }
                `}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-300">
                      {room.name.substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-100 block">
                      {room.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      최근 활동: 방금 전
                    </span>
                  </div>
                </div>
                {room.unread > 0 && (
                  <span className="bg-grass text-white text-xs font-bold px-2.5 py-1 rounded-full min-w-[1.5rem] h-6 flex items-center justify-center shadow-lg">
                    {room.unread > 99 ? "99+" : room.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* 사이드바 하단 */}
        <div className="p-4 border-t border-gray-700/50 bg-gray-800">
          <div className="flex items-center gap-3">
            <DefaultProfile
              src={myProfileImg}
              nickname={myNickname || undefined}
              width="32px"
              height="32px"
              textSize="14px"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-100">
                {myNickname || "사용자"}
              </div>
              <div className="text-xs text-green-400">● 온라인</div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex flex-col relative">
        {/* 모바일 헤더 */}
        <div className="md:hidden p-4 bg-gray-800 border-b border-gray-700/50 flex items-center justify-between">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
            <img src={menuIcon} alt="메뉴" className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold text-white">
            {rooms.find((room) => room.id === selectedRoomId)?.name || "채팅"}
          </h2>
          <div className="w-10"></div>
        </div>

        {/* 채팅 위젯 */}
        <div className="flex-1 p-4">
          <ChatWidget roomName={selectedRoomId} />
        </div>
      </div>

      {/* 모바일 사이드바 오버레이 */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatPage;
