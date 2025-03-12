import { ResultStateType } from "../../../../../../../../../3_Entity/Team/useGetRepeatTeam";

export type UseResultHandlerProps = {
  result: ResultStateType;
  modifyMode: boolean;
  resetResult: () => void;
};
