import React from "react";
import profile from "../../../../4_Shared/assets/svg/profile.svg";
import field_img from "../../assets/img/field.png";
import { FormationPanelProps } from "./type";
import { formations } from "./constant/formation";
import { matchFormation } from "../../../../4_Shared/constant/matchFormation";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";

const FormationPanel = React.memo((props: FormationPanelProps) => {
  const {
    matchFormationIdx,
    matchParticipants,
    matchDisApproveHandler,
    isMatchLeader,
  } = props;
  return (
    <div className="relative flex gap-6 h-full w-[35%]">
      {/* 필드 & 포메이션 선택기 */}
      <div
        className="w-full p-2 flex flex-col gap-6 items-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${field_img})`, // 배경 이미지
        }}
      >
        {/* 포메이션 종류 */}
        <label className="flex flex-col text-xs font-semibold w-full">
          포메이션
          <div className="w-[100px] h-[28px] rounded-[4px] flex justify-center items-center border-1 border-blue bg-white">
            {matchFormation[matchFormationIdx]}
          </div>
        </label>

        {/* 포지션 */}
        {/* 포지션 참가자 프로필 */}
        {formations[matchFormationIdx].map((pos, index) => (
          <div
            key={index}
            className=" absolute translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center p-1 text-sm items-center gap-1"
            style={{ top: pos.top, left: pos.left }} // 동적 스타일
          >
            <div className=" bg-white rounded-[32px] w-[36px] flex flex-col items-center">
              {/* 프로필 이미지 */}
              <img src={profile} alt="profile" className="w-full" />
              <span className="text-xs">{matchPosition[pos.positionIdx]}</span>
            </div>
            {/* 참가자 이름 */}
            {matchParticipants.map((elem) => {
              if (elem.match_position_idx === pos.positionIdx) {
                return (
                  <div className=" flex gap-4 px-2 items-center  bg-gray rounded-lg w-fit text-xs">
                    {isMatchLeader && (
                      <button
                        onClick={() => {
                          matchDisApproveHandler(
                            {
                              player_list_idx: elem.player_list_idx,
                              player_list_nickname: elem.player_list_nickname,
                              player_list_url: elem.player_list_url,
                            },
                            elem.match_position_idx,
                            matchParticipants
                          );
                        }}
                      >
                        X
                      </button>
                    )}
                    <h4>{elem.player_list_nickname}</h4>
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
});
export default FormationPanel;
