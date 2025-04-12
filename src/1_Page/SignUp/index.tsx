import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpInput from "../../4_Shared/hookForm/SignUpInput";
import usePostCheckId from "../../3_Entity/Account/usePostCheckId";
import {
  firstStepSignUpInputSchema,
  secondStepSignUpInputSchema,
} from "../../4_Shared/hookForm/SignUpInput/schema";
import usePostCheckNickName from "../../3_Entity/Account/usePostCheckNickName";
import usePostTemporalSignUp from "../../3_Entity/Account/usePostTemporalSignUp";
import usePostSignUp from "../../3_Entity/Account/usePostSignUp";

const SignUp = () => {
  const [step, setStep] = React.useState<number>(1);

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
    nickName: string;
    phone: string;
    statusMessage?: string;
    discordTag: string;
  }>({
    resolver: yupResolver(secondStepSignUpInputSchema),
    mode: "onChange",
  });

  const [idValidation, postCheckId] = usePostCheckId();
  const [nickNameValidation, postCheckNickName] = usePostCheckNickName();
  const [postTemporalSignUp] = usePostTemporalSignUp();
  const [postSignUp] = usePostSignUp();

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>

        {step === 1 && (
          <form
            onSubmit={firstStepHandleSubmit((data) => {
              if (!idValidation) {
                alert("ID 중복 확인이 필요합니다.");
              } else {
                postTemporalSignUp({ id: data.id, password: data.password });
                setStep(step + 1);
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
              회원가입
            </button>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={secondStepHandleSubmit((data) => {
              if (!nickNameValidation && !idValidation) {
                alert("닉네임 중복 확인이 필요합니다.");
              } else {
                postSignUp({
                  phone: data.phone,
                  nickname: data.nickName,
                  message: data.statusMessage,
                  platform: "pc",
                  common_status_idx: 8,
                  discord_tag: "user#1234",
                  match_position_idx: 11,
                });
              }
            })}
            className="flex flex-col gap-4 w-[320px]"
          >
            <SignUpInput
              register={secondStepRegister}
              registerType="nickName"
              errors={secondStepErrors}
              type="text"
              placeholder="닉네임을 입력하세요"
            />
            <SignUpInput
              register={secondStepRegister}
              registerType="phone"
              errors={secondStepErrors}
              type="text"
              placeholder="- 없이 번호만 입력"
            />
            <SignUpInput
              register={secondStepRegister}
              registerType="statusMessage"
              errors={secondStepErrors}
              type="text"
              placeholder="상태 메시지"
            />
            <SignUpInput
              register={secondStepRegister}
              registerType="discordTag"
              errors={secondStepErrors}
              type="text"
              placeholder="디스코드 태그 ex. user#1234"
            />
            <button
              type="button"
              onClick={() => {
                postCheckNickName({
                  nickname: getSecondStepValues("nickName"),
                });
              }}
              className={`w-full p-2 rounded duration-300 focus:outline-none focus:ring-2 ${
                nickNameValidation
                  ? "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
                  : "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500"
              }`}
            >
              닉네임 중복 확인
            </button>
            <button
              onClick={() => {
                setStep(step - 1);
              }}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              뒤로
            </button>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              가입하기
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
