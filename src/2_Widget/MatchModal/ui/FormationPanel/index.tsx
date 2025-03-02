import React from "react";
import profile from "../../../../4_Shared/assets/svg/profile.svg";
import field_img from "../../assets/img/field.png";
import { FormationPanelProps } from "./type";
import { formations } from "./constant/formation";
import { matchFormation } from "../../../../4_Shared/constant/matchFormation";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import STYLE from "./style";

const FormationPanel = (props: FormationPanelProps) => {
  const { matchFormationIdx, matchWaitList, matchParticipants } = props;
  return (
    <div className={STYLE.FormationPanelWrapper}>
      {/* 필드 & 포메이션 선택기 */}
      <div
        className={STYLE.FormationPanel}
        style={{
          backgroundImage: `url(${field_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 포메이션 종류 */}
        <label className={STYLE.FormationCategoryWrapper}>
          포메이션
          <div className={STYLE.FormationCategory}>
            {matchFormation[matchFormationIdx]}
          </div>
        </label>

        {/* 포지션들 */}
        {formations[matchFormationIdx].map((pos, index) => (
          <div
            key={index}
            className={STYLE.MatchParticipantsPositionContainer}
            style={{ top: pos.top, left: pos.left }} // 동적 스타일
          >
            <img src={profile} alt="profile" className="w-full" />

            {matchParticipants.map((elem) => {
              if (elem.match_position_idx === pos.positionIdx) {
                return <div>{elem.player_list_nickname}</div>;
              }
            })}

            <span className="text-xs">{matchPosition[pos.positionIdx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormationPanel;
