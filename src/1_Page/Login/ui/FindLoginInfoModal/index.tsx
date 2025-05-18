import ModalLayer from "../../../../4_Shared/components/ModalLayer";
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
    <ModalLayer
      toggleModalHandler={toggleModalHandler}
      shape="narrow"
      mode="dark"
    >
      <div className=" relative flex flex-col items-center gap-6 w-full">
        <button onClick={toggleModalHandler} className=" absolute top-1 right-2 cursor-pointer text-xl">
          x
        </button>
        {/* 아이디 찾기 / 비밀번호 찾기 탭 전환 버튼 */}
        <div className="flex gap-4 w-full justify-center mt-2">
          <button
            className={`px-4 py-2 rounded-t-lg font-bold text-sm ${
              tab === "id"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={toggleTab}
          >
            아이디 찾기
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-bold text-sm ${
              tab === "pw"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={toggleTab}
          >
            비밀번호 수정하기
          </button>
        </div>

        {tab === "id" ? (
          <form
            onSubmit={findIdHandleSubmit(() => {
              postCheckFindIdSms({
                phone: getValuesOfFindIdInput("phone"),
                code: getValuesOfFindIdInput("code"),
              });
            })}
            className="w-full flex flex-col items-center gap-4 bg-gray-900 rounded-b-lg p-6"
          >
            <label className="w-full flex flex-col gap-1">
              <span className="text-sm text-gray-300">연락처</span>
              <input
                {...findIdRegister("phone")}
                type="text"
                placeholder="- 없이 숫자만 입력"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none"
              />
              {findIdErrors["phone"] && (
                <p className="text-red-500 text-sm mt-1">
                  {findIdErrors["phone"].message}
                </p>
              )}
            </label>

            <label className="w-full flex flex-col gap-1">
              <span className="text-sm text-gray-300">인증번호</span>
              <input
                {...findIdRegister("code")}
                type="text"
                placeholder="인증번호 입력"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none"
              />
              {findIdErrors["code"] && (
                <p className="text-red-500 text-sm mt-1">
                  {findIdErrors["code"].message}
                </p>
              )}
            </label>

            <button
              type="button"
              className="w-full rounded p-2 bg-gray-500 hover:bg-grass hover:text-black duration-300"
              onClick={() => {
                postReceiveFindIdSms({
                  phone: getValuesOfFindIdInput("phone"),
                });
              }}
            >
              인증번호 전송
            </button>
            <button className="w-full rounded p-2 bg-gray-500 hover:bg-grass hover:text-black duration-300">
              인증번호 확인
            </button>
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
            className="w-full flex flex-col items-center gap-4 bg-gray-900 rounded-b-lg p-6"
          >
            <label className="w-full flex flex-col gap-1">
              <span className="text-sm text-gray-300">아이디</span>
              <input
                {...findPwRegister("id")}
                type="text"
                placeholder="아이디 입력"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none"
              />
              {findPwErrors["id"] && (
                <p className="text-red-500 text-sm mt-1">
                  {findPwErrors["id"].message}
                </p>
              )}
            </label>
            <label className="w-full flex flex-col gap-1">
              <span className="text-sm text-gray-300">연락처</span>
              <input
                {...findPwRegister("phone")}
                type="text"
                placeholder="- 없이 숫자만 입력"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none"
              />
              {findPwErrors["phone"] && (
                <p className="text-red-500 text-sm mt-1">
                  {findPwErrors["phone"].message}
                </p>
              )}
            </label>
            <label className="w-full flex flex-col gap-1">
              <span className="text-sm text-gray-300">새 비밀번호</span>
              <input
                {...findPwRegister("newPassword")}
                type="password"
                placeholder="새 비밀번호 입력"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none"
              />
              {findPwErrors["newPassword"] && (
                <p className="text-red-500 text-sm mt-1">
                  {findPwErrors["newPassword"].message}
                </p>
              )}
            </label>
            <label className="w-full flex flex-col gap-1">
              <span className="text-sm text-gray-300">비밀번호 확인</span>
              <input
                {...findPwRegister("confirmNewPassword")}
                type="password"
                placeholder="비밀번호 확인"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none"
              />
              {findPwErrors["confirmNewPassword"] && (
                <p className="text-red-500 text-sm mt-1">
                  {findPwErrors["confirmNewPassword"].message}
                </p>
              )}
            </label>

            <button className="w-full rounded p-2 bg-gray-500 hover:bg-grass hover:text-black duration-300">
              비밀번호 수정하기
            </button>
          </form>
        )}
      </div>
    </ModalLayer>
  );
};

export default FindLoginInfoModal;
