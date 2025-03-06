import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TeamInfo } from "../../../../3_Entity/Team/type";
import { TeamInfoInput } from "./type";
import { schema } from "./lib/schema";
import useInputHandler from "./model/useInputHandler";

const ManagePage = ({
  teamInfo,
  handleMoveTeamPage,
}: {
  teamInfo: TeamInfo;
  handleMoveTeamPage: () => void;
}) => {
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TeamInfoInput>({
    resolver: yupResolver(schema),
  });
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);
  const [defaultTeamInfoInput] = useInputHandler(reset, teamInfo);
  const inputBackupDataRef = React.useRef<TeamInfoInput>(defaultTeamInfoInput);

  const handleCancle = () => {
    setModifyMode(false);
    reset(inputBackupDataRef.current);
  };

  const onSubmit: SubmitHandler<TeamInfoInput> = () => {
    setModifyMode(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-white shadow-md rounded-lg">
      {/* Team 카드 */}

      {/* 정보 수정 폼 */}
      <div className="w-full max-w-sm">
        <h2 className="text-blue-600 font-semibold text-center text-sm">
          TEAM MANAGEMENT
        </h2>
        <h1 className="text-lg font-bold text-center mt-1">TEAM DETAILS</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-3">
          {/* 팀명 입력 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Team Name
            </label>
            <input
              {...register("team_list_name")}
              disabled={!modifyMode}
              className={`w-full p-1 text-xs ${
                modifyMode
                  ? "border rounded-md"
                  : "border-b bg-transparent text-gray-500"
              }`}
              placeholder="Team Name"
            />
            {errors.team_list_name && (
              <p className="text-red-500 text-xs">
                {errors.team_list_name.message}
              </p>
            )}
          </div>
          {/* 팀 약칭 입력 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Short Team Name
            </label>
            <input
              {...register("team_list_short_name")}
              disabled={!modifyMode}
              className={`w-full p-1 text-xs ${
                modifyMode
                  ? "border rounded-md"
                  : "border-b bg-transparent text-gray-500"
              }`}
              placeholder="Team Abbreviation"
            />
            {errors.team_list_short_name && (
              <p className="text-red-500 text-xs">
                {errors.team_list_short_name.message}
              </p>
            )}
          </div>
          {/* 팀 컬러 선택 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Team Color
            </label>
            <input
              {...register("team_list_color")}
              type="color"
              disabled={!modifyMode}
              className={`w-full p-1 text-xs ${
                modifyMode
                  ? "border rounded-md"
                  : "border-b bg-transparent text-gray-500"
              }`}
            />
            {errors.team_list_color && (
              <p className="text-red-500 text-xs">
                {errors.team_list_color.message}
              </p>
            )}
          </div>
          {/* 팀 엠블렘 이미지 선택 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Team Emblem
            </label>
            <input
              {...register("team_list_emblem")}
              type="file"
              disabled={!modifyMode}
              className="w-full text-xs"
            />
            {errors.team_list_emblem && (
              <p className="text-red-500 text-xs">
                {errors.team_list_emblem.message}
              </p>
            )}
          </div>
          {/* 팀 배너 이미지 선택 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Team Banner
            </label>
            <input
              {...register("team_list_banner")}
              type="file"
              disabled={!modifyMode}
              className="w-full text-xs"
            />
            {errors.team_list_banner && (
              <p className="text-red-500 text-xs">
                {errors.team_list_banner.message}
              </p>
            )}
          </div>
          {/* 팀 공지 수정 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Team Notice
            </label>
            <textarea
              {...register("team_list_announcement")}
              disabled={!modifyMode}
              className="w-full p-1 text-xs border rounded-md"
              placeholder="Team Notice"
            />
            {errors.team_list_announcement && (
              <p className="text-red-500 text-xs">
                {errors.team_list_announcement.message}
              </p>
            )}
          </div>
          {/* 수정/저장 버튼 */}
          {!modifyMode ? (
            <button
              className="w-full py-1 text-xs rounded-md font-bold mt-1 bg-blue-600 text-white"
              onClick={(e) => {
                e.preventDefault();
                inputBackupDataRef.current = getValues(); // 현재 폼 데이터 백업
                setModifyMode(true);
              }}>
              수정하기
            </button>
          ) : (
            <div className="flex w-full py-1 text-xs rounded-md font-bold mt-1 justify-end gap-2">
              <button
                className="w-full h-6 border border-red-600 text-red-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200"
                type="button"
                onClick={handleCancle}>
                취소
              </button>
              <button
                type="submit"
                className="w-full h-6 border border-blue-600 text-blue-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200">
                저장
              </button>
            </div>
          )}
        </form>
        {!modifyMode && (
          <div className="flex w-full py-1 text-xs rounded-md font-bold mt-1 justify-end gap-2">
            <button
              className="w-full h-6 border border-red-600 text-red-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200"
              onClick={() => {
                if (confirm("정말로 팀을 해체하시겠습니까?")) {
                  alert("팀이 해체되었습니다.");
                }
              }}>
              팀 해체
            </button>
            <button
              className="w-full h-6 border border-blue-600 text-blue-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200"
              onClick={() => {
                if (confirm("로그아웃 하시겠습니까?")) {
                  alert("로그아웃되었습니다");
                }
              }}>
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePage;
