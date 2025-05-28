import { useFormContext } from "react-hook-form";

const SubmitBtn = () => {
  const {
    formState: { isValid },
  } = useFormContext();
  return (
    <button
      type="submit"
      disabled={!isValid}
      className={`py-2 px-4 rounded-md text-white font-semibold shadow-md transition duration-300
              ${
                isValid
                  ? "bg-green-600 hover:bg-green-700 active:bg-green-800 focus:ring focus:ring-green-300"
                  : "bg-gray-400 text-gray-500 cursor-none"
              }`}>
      저장
    </button>
  );
};
export default SubmitBtn;
