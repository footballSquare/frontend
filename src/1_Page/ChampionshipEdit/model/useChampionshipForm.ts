import { useForm, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import usePostChampionship from "../../../3_Entity/Community/usePostChampionship";
import usePutChampionship from "../../../3_Entity/Community/usePutChampionship";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValues, schema } from "../lib/schema";
import { convertToAPIChampionship } from "../lib/convert";
import { errorTabDetector } from "../lib/errors";

const useChanpionshipForm = (props: UseChanpionshipFormProps) => {
  const { isEditMode, communityIdx, setActiveTab } = props;
  const method = useForm<ChampionshipFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [postChampionship] = usePostChampionship(communityIdx);
  const [putChampionship] = usePutChampionship(communityIdx);
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
