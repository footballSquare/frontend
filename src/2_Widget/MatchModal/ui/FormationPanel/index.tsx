import React from "react";
import profile from "../../../../4_Shared/assets/svg/profile.svg";
import field_img from "../../assets/img/field.png";
import { formations } from "../../constant/formation";
import { matchFormation } from "../../../../4_Shared/constant/matchFormation";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import useMatchModalStore from "../../../../4_Shared/zustand/useMatchModal";
import { useNavigate } from "react-router-dom";
import { useMyUserIdx } from "../../../../4_Shared/lib/useMyInfo";

const FormationPanel = React.memo((props: FormationPanelProps) => {
  const {
    matchFormationIdx,
    matchParticipants,
    matchDisApproveHandler,
    isMatchLeader,
    matchParticipationType,
  } = props;
  const navigate = useNavigate();
  const { toggleMatchModal } = useMatchModalStore();
  const [userIdx] = useMyUserIdx();

  return (
    <div className="relative flex gap-6 h-full min-w-[38%] text-black">
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
          <div className="w-[100px] h-[28px] rounded-[4px] flex justify-center items-center border border-blue bg-white">
            {matchFormation[matchFormationIdx]}
          </div>
        </label>

        {/* 포지션 */}
        {/* 포지션 참가자 프로필 */}
        {formations[matchFormationIdx]?.map((pos, index) => (
          <div
            key={index}
            className="hover:scale-120 duration-300 absolute translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center p-1 text-sm items-center gap-1"
            style={{ top: pos.top, left: pos.left }} // 동적 스타일
          >
            <div className=" bg-white rounded-[32px] w-[36px] flex flex-col items-center">
              {/* 프로필 이미지 */}
              <img
                src={
                  matchParticipants.find(
                    (participant) =>
                      participant.match_position_idx === pos.positionIdx
                  )?.player_list_url || profile
                }
                alt="profile"
                className="w-[36px] h-[36px] rounded-full cursor-pointer"
                onClick={() => {
                  const player = matchParticipants.find(
                    (participant) =>
                      participant.match_position_idx === pos.positionIdx
                  );
                  if (player) {
                    toggleMatchModal();
                    navigate(`/profile/${player.player_list_idx}`);
                  }
                }}
              />
              <span className="text-xs">{matchPosition[pos.positionIdx]}</span>
            </div>
            {/* 참가자 이름 */}
            {matchParticipants.map((elem, index) => {
              if (elem.match_position_idx === pos.positionIdx) {
                return (
                  <div
                    className=" flex border gap-4 px-2 items-center bg-gray rounded-lg w-[80px] text-xs"
                    key={index}
                  >
                    {(isMatchLeader || elem.player_list_idx === userIdx) && (
                      <button
                        onClick={() => {
                          matchDisApproveHandler({
                            player: {
                              player_list_idx: elem.player_list_idx,
                              player_list_nickname: elem.player_list_nickname,
                              player_list_url: elem.player_list_url,
                              match_waitlist_created_at: new Date().toISOString(),
                            },
                            matchPosition: elem.match_position_idx,
                            isFree: matchParticipationType === 1,
                          });
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
