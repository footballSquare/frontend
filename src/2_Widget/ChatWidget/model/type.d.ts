type UseSocketHandlerReturn = {
  connectionStatus: string;
  chatLog: ChatMessage[];
  sendMessage: (data: ChatFormData) => void;
  error: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
};

type UseSocketHandlerProps = {
  reset: () => void;
  isFloating: boolean;
  isExpanded: boolean;
};
