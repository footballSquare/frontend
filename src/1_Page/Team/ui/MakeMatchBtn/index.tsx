import MakeTeamMatchModal from "./ui/MakeTeamMatchModal";
import React from "react";
import { makeTeamMatchBtnProps } from "./type";

const MakeMatchBtn = (props: makeTeamMatchBtnProps) => {
  const { team_list_idx } = props;
  const [isMakeTeamMatchModal, setIsMakeTeamMatchModal] =
    React.useState<boolean>(false);
  const toggleMakeTeamMatchModal = () =>
    setIsMakeTeamMatchModal(!isMakeTeamMatchModal);

  return (
    <div className="flex gap-2">
      <button className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full">
        팀관리
      </button>
      <button
        className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full cursor-auto"
        onClick={() => {
          setIsMakeTeamMatchModal(true);
        }}>
        매치 생성
      </button>
      {/* 매치 생성 모달 */}
      {isMakeTeamMatchModal && (
        <MakeTeamMatchModal
          team_list_idx={team_list_idx}
          onClose={toggleMakeTeamMatchModal}
        />
      )}
    </div>
  );
};

export default MakeMatchBtn;
