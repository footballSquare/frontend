import Button from "../../../../4_Shared/components/Button";
import usePostOpenMatchModal from "./model/usePostOpenMatchModal";
import usePostOpenMatch from "../../../../3_Entity/Match/usePostOpenMatch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  match_formation_idx: yup.number().required("Formation index is required"),
  match_match_participation_type: yup
    .number()
    .required("Participation type is required"),
  match_type_idx: yup.number().required("Match type index is required"),
  match_match_start_time: yup
    .string()
    .required("Start time is required")
    .matches(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      "Start time must be in the format YYYY-MM-DD HH:mm:ss"
    ),
  match_match_duration: yup.number().required("Duration is required"),
});

const PostOpenMatchPanel = () => {
  const [isOpenPostOpenMatchModal, togglePostOpenMatchModal] =
    usePostOpenMatchModal();
  const [postOpenMatch] = usePostOpenMatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data)
    postOpenMatch({
      match_formation_idx: data.match_formation_idx,
      match_match_participation_type: data.match_match_participation_type,
      match_type_idx: data.match_type_idx,
      match_match_start_time: data.match_match_start_time,
      match_match_duration: data.match_match_duration,
    });
  };

  return (
    <div>
      <Button
        text="매치만들기"
        bg="blue"
        textColor="white"
        bold={true}
        onClickHandler={togglePostOpenMatchModal}
      />
      {isOpenPostOpenMatchModal && (
        <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Create Match</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Formation Index
              </label>
              <input
                type="number"
                {...register("match_formation_idx")}
                className={`mt-1 block w-full p-2 border ${
                  errors.match_formation_idx
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.match_formation_idx && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.match_formation_idx.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Participation Type
              </label>
              <input
                type="number"
                {...register("match_match_participation_type")}
                className={`mt-1 block w-full p-2 border ${
                  errors.match_match_participation_type
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.match_match_participation_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.match_match_participation_type.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Match Type Index
              </label>
              <input
                type="number"
                {...register("match_type_idx")}
                className={`mt-1 block w-full p-2 border ${
                  errors.match_type_idx ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.match_type_idx && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.match_type_idx.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="text"
                {...register("match_match_start_time")}
                placeholder="YYYY-MM-DD HH:mm:ss"
                className={`mt-1 block w-full p-2 border ${
                  errors.match_match_start_time
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.match_match_start_time && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.match_match_start_time.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="number"
                {...register("match_match_duration")}
                className={`mt-1 block w-full p-2 border ${
                  errors.match_match_duration
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.match_match_duration && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.match_match_duration.message}
                </p>
              )}
            </div>
            <button type="submit">매치 생성</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostOpenMatchPanel;
