import React from "react";
import useGetDiscordSiginIn from "../../../3_Entity/Account/useGetDiscordSignIn";

const useDiscord = (props: UseDiscordProps) => {
  const { code, state } = props;
  const [getDiscordSiginIn] = useGetDiscordSiginIn();
  React.useEffect(() => {
    if (code && state) {
      getDiscordSiginIn({ code, state });
    }
  }, [code, state]);
};

export default useDiscord;
