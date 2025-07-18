import React from "react";
import { useNavigate } from "react-router-dom";

import EndChampionshipModal from "./ui/EndChampionshipModal";

import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import useParamInteger from "../../../../../../4_Shared/model/useParamInteger";

const AdminBtnPanel = (props: EndChampionshipPanelProps) => {
  const { championshipInfo } = props;
  const navigate = useNavigate();
  const championshipListIdx = useParamInteger("championshipIdx");
  const [isModalOpen, handleToggleModal] = useToggleState();

  const cachedChampionshipEndDataRef = React.useRef<ChampionshipEndData>(
    {} as ChampionshipEndData
  );

  return (
    <div>
      <button
        className="px-3 py-1 text-sm border border-current rounded-md hover:bg-white/10 transition-colors"
        onClick={() => {
          navigate(
            `/championship-edit/edit/${championshipInfo.community_list_idx}?championshipIdx=${championshipListIdx}`
          );
        }}>
        수정
      </button>
      <button
        onClick={handleToggleModal}
        className="px-3 py-1 text-sm border border-current rounded-md hover:bg-white/10 transition-colors">
        대회 종료
      </button>

      {/* 대회 종료 버튼 클릭시 */}
      {isModalOpen && (
        <EndChampionshipModal
          onClose={handleToggleModal}
          cachedChampionshipEndDataRef={cachedChampionshipEndDataRef}
        />
      )}
    </div>
  );
};

export default AdminBtnPanel;
