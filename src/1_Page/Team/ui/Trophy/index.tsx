import { useState } from "react";
import { TeamAwardProps } from "./type";

const Trophy = (props: TeamAwardProps) => {
  return (
    <div>
      <div className="w-[50px] h-[50px] border border-gray-400 rounded-lg p-4 shadow mr-1">
        <img src={props.championship_list_throphy_img} />
      </div>
      <div className="fixed"></div>
    </div>
  );
};

export default Trophy;
