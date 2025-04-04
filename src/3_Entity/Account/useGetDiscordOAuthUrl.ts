import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetDiscordOAuthUrl = (): [DiscordOAuthUrl, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [discordOAuthUrl, setDiscordOAuthUrl] = React.useState<DiscordOAuthUrl>(
    {} as DiscordOAuthUrl
  );

  React.useEffect(() => {
    request("GET", "/account/oauth/url/discord", null, false);
  }, [request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setDiscordOAuthUrl(serverState.data as DiscordOAuthUrl);
    }
  }, [loading, serverState]);

  return [discordOAuthUrl, loading];
};

export default useGetDiscordOAuthUrl;
