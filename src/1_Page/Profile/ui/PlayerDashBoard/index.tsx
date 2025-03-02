import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./lib/schema";
import React from "react";
import { UserInfoProps } from "./type";
import { UserInfoInput } from "../../../../3_Entity/Account/type";
import { platform } from "../../../../4_Shared/constant/platform";
import STYLE from "./style";
import usePostUserInfo from "../../../../3_Entity/Account/usePutUserInfo";

const POSITION = ["ST", "MF", "DF", "GK"];

const PlayerDashBoard = ({ userInfo }: { userInfo: UserInfoProps }) => {
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserInfoInput>({
    resolver: yupResolver(schema),
  });

  const defaultUserInfoInput: UserInfoInput = {
    ...userInfo,
    platform: String(platform[userInfo.platform]),
    position: POSITION[userInfo.position],
  };

  const inputBackupDataRef = React.useRef<UserInfoInput>(defaultUserInfoInput);

  React.useEffect(() => {
    reset(defaultUserInfoInput);
  }, [userInfo]);

  const handleCancle = () => {
    reset(inputBackupDataRef.current);
  };

  const [postEvent] = usePostUserInfo({ onFail: handleCancle });

  const onSubmit: SubmitHandler<UserInfoInput> = (data) => {
    setModifyMode(false);
    const isChange =
      JSON.stringify(data) !== JSON.stringify(inputBackupDataRef.current);
    if (!isChange) return;
    postEvent({
      ...data,
      platform: platform.indexOf(data.platform),
      position: POSITION.indexOf(data.position),
    });
  };

  return (
    <div className={STYLE.container}>
      {/* Player 카드 */}
      <div className={STYLE.playerCard}>
        <div className={STYLE.playerBox}>
          <div className={STYLE.roleText}>{POSITION[userInfo.position]}</div>
          <div className={STYLE.imageContainer}>
            <img className={STYLE.image} src={userInfo.profile_img} />
          </div>
          <div className={STYLE.textContainer}>
            <p className={STYLE.playerName}>{userInfo.name} #KOR</p>
            <p className={STYLE.playerNumber}>{userInfo.tag}번</p>
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
              <label className={STYLE.explainLabel}>Name</label>
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
              <label className={STYLE.explainLabel}>Nickname</label>
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

          {/* 팀 & 플랫폼 */}
          <div className={STYLE.inputGroup}>
            <div>
              <label className={STYLE.explainLabel}>Team</label>
              <input
                {...register("team")}
                disabled={!modifyMode}
                className={`${STYLE.inputBox} ${
                  modifyMode ? STYLE.inputEnabled : STYLE.inputDisabled
                }`}
                placeholder="Team"
              />
              {errors.team && (
                <p className={STYLE.errorMessage}>{errors.team.message}</p>
              )}
            </div>
            <div>
              <label className={STYLE.explainLabel}>Platform</label>
              <select
                {...register("platform")}
                disabled={!modifyMode}
                className={
                  modifyMode ? STYLE.enableSelectBox : STYLE.disableSelectBox
                }>
                {platform.map((plat, index) => (
                  <option key={index} value={plat}>
                    {plat}
                  </option>
                ))}
              </select>
              {errors.platform && (
                <p className={STYLE.errorMessage}>{errors.platform.message}</p>
              )}
            </div>
          </div>

          {/* 포지션 선택 */}
          <div>
            <label className={STYLE.explainLabel}>Position</label>
            <select
              {...register("position")}
              disabled={!modifyMode}
              className={
                modifyMode ? STYLE.enableSelectBox : STYLE.disableSelectBox
              }>
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

          {/* MMR & 전화번호 */}
          <div className={STYLE.inputGroup}>
            <div>
              <label className={STYLE.explainLabel}>MMR</label>
              <input
                {...register("mmr")}
                type="number"
                disabled={!modifyMode}
                className={`${STYLE.inputBox} ${
                  modifyMode ? STYLE.inputEnabled : STYLE.inputDisabled
                }`}
                placeholder="MMR"
              />
              {errors.mmr && (
                <p className={STYLE.errorMessage}>{errors.mmr.message}</p>
              )}
            </div>
            <div>
              <label className={STYLE.explainLabel}>Phone Number</label>
              <input
                {...register("phone_number")}
                disabled={!modifyMode}
                className={`${STYLE.inputBox} ${
                  modifyMode ? STYLE.inputEnabled : STYLE.inputDisabled
                }`}
                placeholder="000-0000-0000"
              />
              {errors.phone_number && (
                <p className={STYLE.errorMessage}>
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </div>

          {/* 수정/저장 버튼 */}
          {!modifyMode ? (
            <button
              className={`${STYLE.button} ${STYLE.editButton}`}
              onClick={(e) => {
                e.preventDefault();
                inputBackupDataRef.current = getValues(); // 현재 폼 데이터 백업
                setModifyMode(true);
              }}>
              수정하기
            </button>
          ) : (
            <div className={STYLE.buttonBox}>
              <button className={STYLE.cancleButton} onClick={handleCancle}>
                취소
              </button>
              <button
                type="submit"
                className={`${STYLE.button} ${STYLE.saveButton}`}>
                저장
              </button>
            </div>
          )}
        </form>
        {!modifyMode && (
          <div className={STYLE.buttonBox}>
            <button className={STYLE.deleteButton}>delete</button>
            <button className={STYLE.logoutButton}>logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerDashBoard;
