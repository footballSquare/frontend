type ChatBodyProps = {
  error: string | null;
  chatLog: ChatMessageSocket[];
  myNickname?: string | null;
  myProfile?: string | null;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  connectionStatus: string;
  sendMessage: (data: ChatFormData) => void;
};
