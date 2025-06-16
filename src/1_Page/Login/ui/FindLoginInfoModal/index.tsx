import useFindLoginInfoTab from "./model/useFindLoginInfoTab";
import { useForm } from "react-hook-form";
import usePostReceiveFindIdSms from "../../../../3_Entity/Account/usePostReceiveFindIdSms";
import usePostCheckFindIdSms from "../../../../3_Entity/Account/usePostCheckFindIdSms";
import { yupResolver } from "@hookform/resolvers/yup";
import findIdInputSchema from "../../../../4_Shared/hookForm/FindIdInput/schema";
import findPwInputSchema from "../../../../4_Shared/hookForm/findPwInput/schema";
import usePutUserPassword from "../../../../3_Entity/Account/usePutUserPassword";

const FindLoginInfoModal = (props: FindLoginInfoModalProps) => {
  const { toggleModalHandler } = props;
  const [tab, toggleTab] = useFindLoginInfoTab();
  const {
    register: findIdRegister,
    getValues: getValuesOfFindIdInput,
    formState: { errors: findIdErrors },
    handleSubmit: findIdHandleSubmit,
  } = useForm<{
    phone: string;
    code: string;
  }>({
    resolver: yupResolver(findIdInputSchema),
    mode: "onChange",
  });

  const {
    register: findPwRegister,
    getValues: getValuesOfFindPwInput,
    formState: { errors: findPwErrors },
    handleSubmit: findPwHandleSubmit,
  } = useForm<{
    phone: string;
    id: string;
    newPassword: string;
    confirmNewPassword: string;
  }>({
    resolver: yupResolver(findPwInputSchema),
    mode: "onChange",
  });
  const [postReceiveFindIdSms] = usePostReceiveFindIdSms();
  const [postCheckFindIdSms] = usePostCheckFindIdSms();
  const [putUserPassword, ,] = usePutUserPassword();
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleModalHandler}
      ></div>

      {/* Modal Content */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={toggleModalHandler}
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors duration-200 text-xl font-bold"
        >
          ×
        </button>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl mb-3 shadow-lg">
            <span className="text-lg font-bold text-white">?</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Account Recovery
          </h2>
          <p className="text-gray-300 text-sm">Find your login information</p>
        </div>
        {/* Tab Buttons */}
        <div className="flex gap-1 mb-6 bg-gray-700/50 rounded-lg p-1">
          <button
            className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
              tab === "id"
                ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={toggleTab}
          >
            Find ID
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
              tab === "pw"
                ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={toggleTab}
          >
            Reset Password
          </button>
        </div>{" "}
        {tab === "id" ? (
          <form
            onSubmit={findIdHandleSubmit(() => {
              postCheckFindIdSms({
                phone: getValuesOfFindIdInput("phone"),
                code: getValuesOfFindIdInput("code"),
              });
            })}
            className="space-y-4"
          >
            {/* Phone Input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-200">
                연락처
              </label>
              <div className="relative">
                <input
                  {...findIdRegister("phone")}
                  type="text"
                  placeholder="- 없이 숫자만 입력"
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                />
                {findIdErrors["phone"] && (
                  <div className="absolute -bottom-5 left-0">
                    <p className="text-red-400 text-xs">
                      {findIdErrors["phone"].message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Code Input */}
            <div className="space-y-1 pt-1">
              <label className="text-sm font-medium text-gray-200">
                인증번호
              </label>
              <div className="relative">
                <input
                  {...findIdRegister("code")}
                  type="text"
                  placeholder="인증번호 입력"
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                />
                {findIdErrors["code"] && (
                  <div className="absolute -bottom-5 left-0">
                    <p className="text-red-400 text-xs">
                      {findIdErrors["code"].message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-3">
              <button
                type="button"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                onClick={() => {
                  postReceiveFindIdSms({
                    phone: getValuesOfFindIdInput("phone"),
                  });
                }}
              >
                인증번호 전송
              </button>
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-transparent hover:from-gray-500 hover:to-gray-700 text-sm"
              >
                인증번호 확인
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={findPwHandleSubmit(() => {
              putUserPassword({
                phone: getValuesOfFindPwInput("phone"),
                id: getValuesOfFindPwInput("id"),
                password: getValuesOfFindPwInput("newPassword"),
              });
            })}
            className="space-y-4"
          >
            {/* ID Input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-200">
                아이디
              </label>
              <div className="relative">
                <input
                  {...findPwRegister("id")}
                  type="text"
                  placeholder="아이디 입력"
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                />
                {findPwErrors["id"] && (
                  <div className="absolute -bottom-5 left-0">
                    <p className="text-red-400 text-xs">
                      {findPwErrors["id"].message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-1 pt-1">
              <label className="text-sm font-medium text-gray-200">
                연락처
              </label>
              <div className="relative">
                <input
                  {...findPwRegister("phone")}
                  type="text"
                  placeholder="- 없이 숫자만 입력"
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                />
                {findPwErrors["phone"] && (
                  <div className="absolute -bottom-5 left-0">
                    <p className="text-red-400 text-xs">
                      {findPwErrors["phone"].message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* New Password Input */}
            <div className="space-y-1 pt-1">
              <label className="text-sm font-medium text-gray-200">
                새 비밀번호
              </label>
              <div className="relative">
                <input
                  {...findPwRegister("newPassword")}
                  type="password"
                  placeholder="새 비밀번호 입력"
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                />
                {findPwErrors["newPassword"] && (
                  <div className="absolute -bottom-5 left-0">
                    <p className="text-red-400 text-xs">
                      {findPwErrors["newPassword"].message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1 pt-1">
              <label className="text-sm font-medium text-gray-200">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  {...findPwRegister("confirmNewPassword")}
                  type="password"
                  placeholder="비밀번호 확인"
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                />
                {findPwErrors["confirmNewPassword"] && (
                  <div className="absolute -bottom-5 left-0">
                    <p className="text-red-400 text-xs">
                      {findPwErrors["confirmNewPassword"].message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-transparent hover:from-gray-500 hover:to-gray-700 text-sm"
              >
                비밀번호 수정하기
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FindLoginInfoModal;
