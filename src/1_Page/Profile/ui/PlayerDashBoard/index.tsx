import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./lib/schema";
import React, { useState } from "react";
import { UserInfoProps, UserInfoInput } from "./type";
import { platform } from "../../../../4_Shared/constant/platform";
import STYLE from "./style";

const POSITION = ["ST", "MF", "DF", "GK"];

const PlayerDashBoard = ({ userInfo }: { userInfo: UserInfoProps }) => {
  const [modifyMode, setModifyMode] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoInput>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset({
      ...userInfo,
      position: "ST",
      platform: platform[userInfo.platform],
    });
  }, [userInfo]);

  const onSubmit: SubmitHandler<UserInfoInput> = (data) => {
    setModifyMode(false);
    console.log("폼 제출됨:", data);
  };

  return (
    <div className={STYLE.container}>
      {/* Player 카드 */}
      <div className={STYLE.playerCard}>
        <div className={STYLE.playerBox}>
          <div className="text-xs font-bold self-start">RW</div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src="https://example.com/player.png"
              alt="Player"
              className="max-w-[80%] max-h-[60%] object-contain"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">김네이마루 #KOR</p>
            <p className="text-xs">10번</p>
          </div>
        </div>
      </div>

      {/* 정보 수정 폼 */}
      <div className={STYLE.formContainer}>
        <h2 className={STYLE.formTitle}>YOUR NOT ALONE</h2>
        <h1 className={STYLE.formSubtitle}>BEST PLAYER</h1>
        <p className={STYLE.formText}>State message in here</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-3">
          {/* 이름 & 닉네임 */}
          <div className={STYLE.inputGroup}>
            <div>
              <label className="text-xs font-medium text-gray-600">Name</label>
              <input
                {...register("name")}
                disabled={!modifyMode}
                className={`${STYLE.inputBox} ${
                  modifyMode ? STYLE.inputEnabled : STYLE.inputDisabled
                }`}
                placeholder="Name"
              />
              {errors.name && (
                <p className={STYLE.errorMessage}>{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">
                Nickname
              </label>
              <input
                {...register("nickname")}
                disabled={!modifyMode}
                className={`${STYLE.inputBox} ${
                  modifyMode ? STYLE.inputEnabled : STYLE.inputDisabled
                }`}
                placeholder="Nickname"
              />
              {errors.nickname && (
                <p className={STYLE.errorMessage}>{errors.nickname.message}</p>
              )}
            </div>
          </div>

          {/* 포지션 선택 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Position
            </label>
            <select
              {...register("position")}
              disabled={!modifyMode}
              className={STYLE.selectBox}>
              {POSITION.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
            {errors.position && (
              <p className={STYLE.errorMessage}>{errors.position.message}</p>
            )}
          </div>

          {/* 수정/저장 버튼 */}
          {!modifyMode ? (
            <button
              className={`${STYLE.button} ${STYLE.editButton}`}
              onClick={(e) => {
                e.preventDefault();
                setModifyMode(true);
              }}>
              수정하기
            </button>
          ) : (
            <button
              type="submit"
              className={`${STYLE.button} ${STYLE.saveButton}`}>
              저장하기
            </button>
          )}
        </form>

        {/* 로그아웃 / 계정 삭제 버튼 */}
        <div className={STYLE.buttonContainer}>
          <button
            disabled={modifyMode}
            className={`${STYLE.logoutButton} ${
              modifyMode ? STYLE.buttonDisabled : STYLE.buttonHoverLogout
            }`}>
            로그아웃
          </button>
          <button
            disabled={modifyMode}
            className={`${STYLE.deleteButton} ${
              modifyMode ? STYLE.buttonDisabled : STYLE.buttonHoverDelete
            }`}>
            계정 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashBoard;
