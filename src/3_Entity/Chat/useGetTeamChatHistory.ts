import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 30;

const useGetTeamChatHistory = (
  page: number
): [ChatMessageTeam[], boolean, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [chatHistory, setChatHistory] = React.useState<ChatMessageTeam[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    const endPoint = `/chat/team/?page=${page}`;
    request("GET", endPoint, null, true);
  }, [page]);

  React.useEffect(() => {
    if (!loading && serverState && "chat" in serverState) {
      const fetchedData = (serverState as { chat: ChatMessageTeam[] }).chat;
      setChatHistory((prev) => [...prev, ...fetchedData]);
      setHasMoreContent(fetchedData.length >= ITEMS_PER_PAGE);
    }
  }, [loading, serverState]);

  return [chatHistory, hasMoreContent, loading];
};

export default useGetTeamChatHistory;
