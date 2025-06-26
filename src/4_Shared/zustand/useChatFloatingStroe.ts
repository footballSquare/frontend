import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ChatFloatingState = {
  isFloating: boolean;
  toggleIsFloating: () => void;
};

// persist로 zustand 상태 최신 관리
export const useChatFloatingStroe = create<ChatFloatingState>()(
  persist(
    (set, get) => ({
      isFloating: false,
      toggleIsFloating: () => set({ isFloating: !get().isFloating }),
    }),
    {
      name: "chat:isFloating",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
