import React from "react";

const useFindLoginInfoTab = (): ["id" | "pw", () => void] => {
  const [tab, setTab] = React.useState<"id" | "pw">("id");

  const toggleTab = () => {
    setTab(tab === "id" ? "pw" : "id");
  };

  return [tab, toggleTab];
};

export default useFindLoginInfoTab;
