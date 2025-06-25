type UseSocketHandlerReturn = {
  connectionStatus: string;
  chatLog: ChatMessageSocket[];
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

type UseGetChatHistoryHandlerProps = {
  chatLog: ChatMessageSocket[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
};
type UseGetChatHistoryHandlerReturn = {
  mappedChatHistory: TeamChatMessage[];
  displayedMessages: DisplayedMessage[];
  pageRef: (node?: Element | null) => void;
  loading: boolean;
};

type UseFloatExpandedHandelrReturn = {
  isExpanded: boolean;
  toggleExpanded: () => void;
  isFloating: boolean;
  toggleIsFloating: () => void;
};
