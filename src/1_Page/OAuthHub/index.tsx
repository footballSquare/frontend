import useGetDiscordSiginIn from "../../3_Entity/Account/useGetDiscordSignIn";

const OAuthHub = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get("code");
  const state = queryParams.get("state");
  const [getDiscordSiginIn] = useGetDiscordSiginIn();
  getDiscordSiginIn({ code: code || "", state: state || "" });
  return (
    <div>
      <p>Please Wait...</p>
    </div>
  );
};

export default OAuthHub;
