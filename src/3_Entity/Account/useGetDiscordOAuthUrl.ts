import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetDiscordOAuthUrl = (
  props: UseGetDiscordOAuthUrlProps
): [DiscordOAuthUrl, boolean] => {
  const { signInPersist, deviceUUID } = props;
  const [serverState, request, loading] = useFetchData();
  const [discordOAuthUrl, setDiscordOAuthUrl] = React.useState<DiscordOAuthUrl>(
    {} as DiscordOAuthUrl
  );

  React.useEffect(() => {
    request(
      "GET",
      `/account/oauth/url/discord/?persistent=${signInPersist}&device_uuid=${deviceUUID}`,
      null,
      false
    );
  }, [request, signInPersist, deviceUUID]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setDiscordOAuthUrl(serverState.data as DiscordOAuthUrl);
    }
  }, [loading, serverState]);

  return [discordOAuthUrl, loading];
};

export default useGetDiscordOAuthUrl;
