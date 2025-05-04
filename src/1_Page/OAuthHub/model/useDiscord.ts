import React from "react";
import useGetDiscordSiginIn from "../../../3_Entity/Account/useGetDiscordSignIn";

const useDiscord = () => {
  const [getDiscordSiginIn] = useGetDiscordSiginIn();
  React.useEffect(() => {
    getDiscordSiginIn({ code: code || "", state: state || "" });
  }, []);
}

export default useDiscord;