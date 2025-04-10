import React from "react";
import useGetChampionshipEndData from "../../../../3_Entity/Championship/useGetChampionshipEndData";
import useGetChampionshipInfo from "../../../../3_Entity/Championship/useGetChampionshipInfo";
import useEditChampionshipStore from "../../../../4_Shared/zustand/useEditChampionshipStore";
import { convertToChampionshipForm } from "./util/conver";

const EditRequest = (props: EditRequestProps) => {
  const { reset } = props;
  const { championshipListIdx } = useEditChampionshipStore();

  // 항상 숫자를 전달하기 위해 기본값 0 사용
  const idx = championshipListIdx || 0;

  // 훅은 조건부 호출하지 않고 항상 호출됨
  const [championshipEndData] = useGetChampionshipEndData(idx);
  const [championshipInfo] = useGetChampionshipInfo(idx);

  React.useEffect(() => {
    if (
      !championshipInfo ||
      Object.keys(championshipInfo).length === 0 ||
      !championshipEndData ||
      Object.keys(championshipEndData).length === 0
    )
      return;
    reset(convertToChampionshipForm(championshipInfo, championshipEndData));
  }, [championshipEndData, championshipInfo, reset]);

  return null;
};

export default EditRequest;
