type ChatWidgetProps = {
  isPage?: boolean;
};
type ChatMessageSocket = {
  sender_idx: number;
  sender_nickname: string;
  sender_profile_image: string;
  message: string;
  timestamp?: Date;
};

type ErrorResponse = {
  status: number;
  message: string;
};

type ChatFormData = {
  chatInput: string;
};

type DisplayedMessage = ChatMessageSocket | TeamChatMessage;
