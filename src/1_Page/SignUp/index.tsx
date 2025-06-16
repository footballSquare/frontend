import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpInput from "../../4_Shared/hookForm/SignUpInput";
import usePostCheckId from "../../3_Entity/Account/usePostCheckId";
import {
  firstStepSignUpInputSchema,
  secondStepSignUpInputSchema,
} from "../../4_Shared/hookForm/SignUpInput/schema";
import usePostTemporalSignUp from "../../3_Entity/Account/usePostTemporalSignUp";
import { useNavigate } from "react-router-dom";
import usePostCheckAuthSms from "../../3_Entity/Account/usePostCheckAuthSms";
import useSignUpStep from "./model/useSignUpStep";
import useReceiveAuthSms from "./model/useReceiveAuthSms";
import useTermOfUseModal from "./model/useTermOfUseModal";
import TermOfUseModal from "./ui/TermOfUseModal";

const SignUp = () => {
  const [step, setStep] = useSignUpStep();
  const navigate = useNavigate();
  const [isTermOfUseModalOpen, toggleIsTermOfUseModal] = useTermOfUseModal();

  const {
    register: firstStepRegister,
    handleSubmit: firstStepHandleSubmit,
    formState: { errors: firstStepErrors },
    getValues: getFirstStepValues, // Add getValues to retrieve field values
  } = useForm<{
    id: string;
    password: string;
    confirmPassword: string;
  }>({
    resolver: yupResolver(firstStepSignUpInputSchema),
    mode: "onChange",
  });
  const {
    register: secondStepRegister,
    handleSubmit: secondStepHandleSubmit,
    formState: { errors: secondStepErrors },
    getValues: getSecondStepValues, // Add getValues to retrieve field values
  } = useForm<{
    phone: string;
    sms: string;
  }>({
    resolver: yupResolver(secondStepSignUpInputSchema),
    mode: "onChange",
  });

  const [idValidation, postCheckId] = usePostCheckId();
  const [postTemporalSignUp] = usePostTemporalSignUp();
  const [isValidAuthSms, postCheckAuthSms] = usePostCheckAuthSms();
  const [authPhone, setAuthPhone] = React.useState<string>("");
  const [isSmsSent, postReceiveAuthSms] = useReceiveAuthSms();
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Glass Card */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
          {step === 1 && (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl mb-3 shadow-lg">
                  <span className="text-lg font-bold text-white">FS</span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">Join Us</h1>
                <p className="text-gray-300 text-sm">
                  Create your Football Square account
                </p>
              </div>

              {/* Sign Up Form - Step 1 */}
              <form
                onSubmit={firstStepHandleSubmit((data) => {
                  if (!idValidation) {
                    alert("ID 중복 확인이 필요합니다.");
                  } else {
                    postTemporalSignUp({
                      id: data.id,
                      password: data.password,
                    });
                    setStep(2);
                  }
                })}
                className="space-y-4"
              >
                <SignUpInput
                  register={firstStepRegister}
                  registerType="id"
                  errors={firstStepErrors}
                  type="text"
                  placeholder="영문/숫자 8-20 글자"
                />
                <SignUpInput
                  register={firstStepRegister}
                  registerType="password"
                  errors={firstStepErrors}
                  type="password"
                  placeholder="영문/숫자/특수기호 포함, 8-20 글자"
                />
                <SignUpInput
                  register={firstStepRegister}
                  registerType="confirmPassword"
                  errors={firstStepErrors}
                  type="password"
                  placeholder="비밀번호 확인"
                />

                {/* ID Check Button */}
                <button
                  type="button"
                  onClick={() => {
                    postCheckId({ id: getFirstStepValues("id") });
                  }}
                  className={`w-full py-2.5 font-semibold rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
                    idValidation
                      ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
                      : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                  }`}
                >
                  아이디 중복 확인
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-transparent hover:from-gray-500 hover:to-gray-700 text-sm"
                >
                  다음 단계
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl mb-3 shadow-lg">
                  <span className="text-lg font-bold text-white">FS</span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  Phone Verification
                </h1>
                <p className="text-gray-300 text-sm">
                  Verify your phone number to complete signup
                </p>
              </div>

              {/* Sign Up Form - Step 2 */}
              <form
                onSubmit={secondStepHandleSubmit(() => {
                  if (isValidAuthSms) {
                    alert("회원가입 완료!");
                    navigate(`/`);
                  } else {
                    alert("핸드폰 번호 인증이 완료되어야 합니다..");
                  }
                })}
                className="space-y-4"
              >
                <SignUpInput
                  register={secondStepRegister}
                  registerType="phone"
                  errors={secondStepErrors}
                  type="text"
                  placeholder="- 없이 번호만 입력"
                />
                <SignUpInput
                  register={secondStepRegister}
                  registerType="sms"
                  errors={secondStepErrors}
                  type="text"
                  placeholder="인증번호 입력"
                />

                {/* SMS Send Button */}
                <button
                  type="button"
                  onClick={() => {
                    const phone = getSecondStepValues("phone");
                    if (secondStepErrors.phone) {
                      alert("핸드폰 번호 형식이 올바르지 않습니다.");
                      return;
                    }
                    if (!phone) {
                      alert("핸드폰 번호를 입력해주세요.");
                      return;
                    }
                    postReceiveAuthSms({ phone });
                    setAuthPhone(phone);
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {isSmsSent ? "인증번호 재전송" : "인증번호 전송"}
                </button>

                {/* SMS Verification Button */}
                <button
                  type="button"
                  onClick={() => {
                    postCheckAuthSms({
                      phone: authPhone,
                      code: getSecondStepValues("sms"),
                    });
                  }}
                  className={`w-full py-2.5 font-semibold rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
                    isValidAuthSms
                      ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
                      : "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500"
                  }`}
                >
                  인증번호 확인
                </button>

                {/* Complete Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-transparent hover:from-gray-500 hover:to-gray-700 text-sm"
                >
                  가입 완료
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs">
            Already have an account?
            <button
              onClick={() => navigate("/login")}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
      {/* Modal */}
      {isTermOfUseModalOpen && (
        <TermOfUseModal toggleModalHandler={toggleIsTermOfUseModal} />
      )}
    </div>
  );
};

export default SignUp;
