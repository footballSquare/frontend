import React from "react";
import profile from "../../../../4_Shared/assets/svg/profile.svg";
import field_img from "../../assets/img/field.png";
import { FormationPanelProps } from "./type";
import { formations } from "./constant/formation";
import { matchFormation } from "../../../../4_Shared/constant/matchFormation";
const FormationPanel = (props: FormationPanelProps) => {
  const { matchFormationIdx, matchWaitList, matchParticipants } = props;
  return (
    <div className=" relative flex gap-6 h-full w-[30%]">
      {/* 필드 & 포메이션 선택기 */}
      <div
        className="w-full p-4 flex flex-col gap-12 items-center"
        style={{
          backgroundImage: `url(${field_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 포메이션 종류 */}
        <label className=" flex flex-col text-xs font-semibold w-full">
          포메이션
          <div className=" w-[164px] h-[32px] rounded-[4px] flex justify-center items-center border-1 border-blue bg-white">
            {matchFormation[matchFormationIdx]}
          </div>
        </label>

        {/* 포지션들 */}
        {formations[matchFormationIdx].map((pos, index) => (
          <div
            key={index}
            className={`absolute flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center`}
            style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -50%)" }}
          >
            <img src={profile} alt="profile" className="w-full" />
            <span className="text-xs">{pos.position}</span>
          </div>
        ))}

      </div>
    </div>
    
  );
};

export default FormationPanel;
