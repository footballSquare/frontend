import React from "react";
import useGetTeamChatHistory from "../../../3_Entity/Chat/useGetTeamChatHistory";
import useInfiniteScrollPaging from "../../../4_Shared/model/useInfiniteScrollPaging";

const useGetChatHistoryHandler = (
  props: UseGetChatHistoryHandlerProps
): UseGetChatHistoryHandlerReturn => {
  const { chatLog, messagesEndRef } = props;

  const [page, setPage] = React.useState<number>(0);
  const [chatHistory, hasMoreContent, loading] = useGetTeamChatHistory(page);
  const [pageRef] = useInfiniteScrollPaging(setPage, loading, hasMoreContent);

  const mappedChatHistory = React.useMemo(
    () =>
      [...chatHistory].sort(
        (a, b) =>
          new Date(a.team_chat_message_created_at).getTime() -
          new Date(b.team_chat_message_created_at).getTime()
      ),
    [chatHistory]
  );

  const displayedMessages = React.useMemo(
    () => [...mappedChatHistory, ...chatLog],
    [mappedChatHistory, chatLog]
  );

  React.useEffect(() => {
    // 최초 마운트
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [chatHistory]);

  return {
    mappedChatHistory,
    displayedMessages,
    pageRef,
    loading,
  };
};

export default useGetChatHistoryHandler;
