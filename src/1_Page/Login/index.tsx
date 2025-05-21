import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginInputSchema from "../../4_Shared/hookForm/LoginInput/schema";
import usePostSignIn from "../../3_Entity/Account/usePostSignIn";
import discord_icon from "../../4_Shared/assets/svg/discord.svg";
import useGetDiscordOAuthUrl from "../../3_Entity/Account/useGetDiscordOAuthUrl";
import { useNavigate } from "react-router-dom";
import useFindLoginInfoModal from "./model/useFindLoginInfoModal";
import FindLoginInfoModal from "./ui/FindLoginInfoModal";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginInputSchema),
  });
  const [postSignIn] = usePostSignIn();
  const [discordOAuthUrl, discordLoading] = useGetDiscordOAuthUrl();
  const [isFindLoginInfoModalOpen, toggleIsFindLoginInfoModalOpen] =
    useFindLoginInfoModal();
  const navigate = useNavigate();

  return (
    <div>
      {isFindLoginInfoModalOpen && (
        <FindLoginInfoModal
          toggleModalHandler={toggleIsFindLoginInfoModalOpen}
        />
      )}
      <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
        <div className="bg-gray-800 text-gray-100 p-4 rounded shadow-md min-w-[300px]">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form
            onSubmit={handleSubmit((data) => {
              postSignIn({ id: data.id, password: data.password });
            })}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray">ID</label>
              <input
                type={"text"}
                id={"id"}
                {...register("id")}
                className={`mt-1 block w-full p-2 border ${
                  errors.id ? "border-red-500" : "border-gray"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={"Enter your ID"}
              />
              {errors["id"] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors["id"].message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray">
                PassWord
              </label>
              <input
                type={"password"}
                id={"password"}
                {...register("password")}
                className={`mt-1 block w-full p-2 border ${
                  errors.id ? "border-red-500" : "border-gray"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={"Enter your Password"}
              />
              {errors["password"] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors["password"].message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 w-full py-2 bg-gray-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            <button
              className="mt-4 w-full py-2 bg-gray-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </button>
          </form>
        </div>
        <div
          className="m-0 text-white hover:text-blue cursor-pointer"
          onClick={toggleIsFindLoginInfoModalOpen}
        >
          로그인 정보를 잊어버리셨나요?
        </div>
        <div className="text-gray-500">-------------- or --------------</div>
        <button
          className=" flex gap-2 justify-evenly items-center bg-gray-400 hover:bg-gray-500 text-gray-100  rounded w-full"
          onClick={() => {
            if (!discordLoading) {
              window.location.href = discordOAuthUrl.url;
            }
          }}
        >
          <img className="w-[48px]" src={discord_icon} alt="discord" />
          <span>Start with Discord</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
