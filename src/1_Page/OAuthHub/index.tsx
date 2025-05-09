import useDiscord from "./model/useDiscord";

const OAuthHub = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get("code");
  const state = queryParams.get("state");
  
  useDiscord({ code, state });
  
  return (
    <div>
      <p>Please Wait...</p>
    </div>
  );
};

export default OAuthHub;
