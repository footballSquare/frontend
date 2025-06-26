import { useForm, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import usePostChampionship from "../../../3_Entity/Community/usePostChampionship";
import usePutChampionship from "../../../3_Entity/Community/usePutChampionship";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValues, schema } from "../lib/schema";
import {
  convertToAPIChampionship,
  convertToChampionshipForm,
} from "../lib/convert";
import { errorTabDetector } from "../lib/errors";
import { useSearchParams } from "react-router-dom";
import React from "react";
import useGetChampionshipEndData from "../../../3_Entity/Championship/useGetChampionshipEndData";
import useGetChampionshipInfo from "../../../3_Entity/Championship/useGetChampionshipInfo";

const useChanpionshipForm = (props: UseChanpionshipFormProps) => {
  const { isEditMode, communityIdx, setActiveTab } = props;
  const method = useForm<ChampionshipFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { reset } = method;

  const [postChampionship] = usePostChampionship(communityIdx);
  const [putChampionship] = usePutChampionship(communityIdx);

  // edit 모드가 아닌 경우 championshipIdx는 0으로 설정해 데이터를 요청하지 않는다
  const [searchParams] = useSearchParams();
  const championshipIdx = isEditMode
    ? Number(searchParams.get("championshipIdx") ?? 0)
    : 0;
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

  // 성공 시 처리
  const onValid: SubmitHandler<ChampionshipFormValues> = (data) => {
    const body = convertToAPIChampionship(data);
    if (isEditMode) {
      putChampionship(body);
    } else {
      postChampionship(body);
    }
  };

  // 에러 발생 시 해당 에러 탭으로 이동
  const onInvalid: SubmitErrorHandler<ChampionshipFormValues> = (errors) => {
    const errorLocation = errorTabDetector(errors);
    if (errorLocation) {
      setActiveTab(errorLocation);
    }
  };
  return {
    method,
    onValid,
    onInvalid,
  };
};
export default useChanpionshipForm;
