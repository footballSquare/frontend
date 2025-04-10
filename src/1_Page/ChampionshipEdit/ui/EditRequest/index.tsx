import React from "react";
import { useSearchParams } from "react-router-dom";
import useGetChampionshipEndData from "../../../../3_Entity/Championship/useGetChampionshipEndData";
import useGetChampionshipInfo from "../../../../3_Entity/Championship/useGetChampionshipInfo";
import { convertToChampionshipForm } from "./util/conver";

const EditRequest = (props: EditRequestProps) => {
  const { reset } = props;
  const [searchParams] = useSearchParams();
  const championshipIdx = Number(searchParams.get("championshipIdx") ?? 0);

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
