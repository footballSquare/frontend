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
import usePostReceiveAuthSms from "../../3_Entity/Account/usePostReceiveAuthSms";
import usePostCheckAuthSms from "../../3_Entity/Account/usePostCheckAuthSms";
import useSignUpStep from "./model/useSignUpStep";

const SignUp = () => {
  const [step, setStep] = useSignUpStep();
  const navigate = useNavigate();

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
  const [postReceiveAuthSms] = usePostReceiveAuthSms();

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
            <form
              onSubmit={firstStepHandleSubmit((data) => {
                if (!idValidation) {
                  alert("ID 중복 확인이 필요합니다.");
                } else {
                  postTemporalSignUp({ id: data.id, password: data.password });
                  setStep(2);
                }
              })}
              className="flex flex-col gap-4 w-[320px]"
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
              <button
                type="button"
                onClick={() => {
                  postCheckId({ id: getFirstStepValues("id") });
                }}
                className={`w-full p-2 rounded duration-300 focus:outline-none focus:ring-2 ${
                  idValidation
                    ? "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
                    : "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500"
                }`}
              >
                아이디 중복 확인
              </button>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                회원가입 진행
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">핸드폰 인증</h1>
            <form
              onSubmit={secondStepHandleSubmit(() => {
                if (isValidAuthSms) {
                  alert("회원가입 완료!");
                  navigate(`/`);
                } else {
                  alert("핸드폰 번호 인증이 완료되어야 합니다..");
                }
              })}
              className="flex flex-col gap-4 w-[320px]"
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
              <button
                onClick={() => {
                  postReceiveAuthSms({ phone: getSecondStepValues("phone") });
                  setAuthPhone(getSecondStepValues("phone"));
                }}
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                인증번호 전송
              </button>
              <button
                onClick={() => {
                  postCheckAuthSms({
                    phone: authPhone,
                    code: getSecondStepValues("sms"),
                  });
                }}
                className={`w-full p-2 rounded duration-300 focus:outline-none focus:ring-2 ${
                  isValidAuthSms
                    ? "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
                    : "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500"
                }`}
              >
                인증번호 확인
              </button>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                가입 완료
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
