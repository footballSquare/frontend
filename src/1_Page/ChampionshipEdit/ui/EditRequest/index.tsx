import React from "react";
import useGetChampionshipEndData from "../../../../3_Entity/Championship/useGetChampionshipEndData";
import useGetChampionshipInfo from "../../../../3_Entity/Championship/useGetChampionshipInfo";
import { convertToChampionshipForm } from "./util/conver";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";

const EditRequest = (props: EditRequestProps) => {
  const { reset } = props;
  const championshipIdx = useParamInteger("championshipIdx");

  // 훅은 조건부 호출하지 않고 항상 호출됨
  const [championshipEndData] = useGetChampionshipEndData(championshipIdx);
  const [championshipInfo] = useGetChampionshipInfo(championshipIdx);

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
