import { useForm, FormProvider } from "react-hook-form";
import PostMakeTeamInput from "../../../../../../4_Shared/hookForm/PostMakeTeamInput";
import usePostMakeTeam from "../../../../../../3_Entity/Team/usePostMakeTeam";
import { yupResolver } from "@hookform/resolvers/yup";
import { postMakeTeamInputSchema } from "../../../../../../4_Shared/hookForm/PostMakeTeamInput/schema";
import usePostMakeTeamHandler from "./model/usePostMakeTeamHandler";

const CreateTeamModal = (props: CreateTeamModalProps) => {
  const { onClose } = props;
  const methods = useForm<TeamCreateFormValues>({
    resolver: yupResolver(postMakeTeamInputSchema),
    defaultValues: {
      team_list_name: "",
      team_list_short_name: "",
      team_list_color: "#3182F6",
      common_status_idx: 0,
      team_list_announcement: "",
    },
  });
  const { handleSubmit } = methods;
  const [postMakeTeam] = usePostMakeTeamHandler();

  return (
    <div className="fixed inset-0 z-10 h-full bg-black/60 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-4 rounded-xl w-full overflow-auto max-h-[90%] max-w-md shadow-lg overscroll-contain">
        <h2 className="text-xl font-bold text-gray-100 mb-5">팀 생성하기</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit((data) => postMakeTeam(data))}>
            <PostMakeTeamInput registerType="team_list_name" />
            <PostMakeTeamInput registerType="team_list_short_name" />
            <PostMakeTeamInput registerType="team_list_color" />
            <PostMakeTeamInput registerType="common_status_idx" />
            <PostMakeTeamInput registerType="team_list_announcement" />

            <div className="flex space-x-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-grass hover:bg-grass/80 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                팀 생성하기
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 px-4 rounded-lg transition-colors">
                취소
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateTeamModal;
