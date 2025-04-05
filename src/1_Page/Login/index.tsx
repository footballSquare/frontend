import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginInput from "../../4_Shared/hookForm/LoginInput";
import loginInputSchema from "../../4_Shared/hookForm/LoginInput/schema";
import useGetSignIn from "../../3_Entity/Account/useGetSignIn";
import discord_icon from "../../4_Shared/assets/svg/discord.svg";
import useGetDiscordOAuthUrl from "../../3_Entity/Account/useGetDiscordOAuthUrl";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginInputSchema),
  });
  const [signInEvent] = useGetSignIn();
  const [discordOAuthUrl, discordLoading] = useGetDiscordOAuthUrl();

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form
          onSubmit={handleSubmit((data) => {
            signInEvent({ id: data.id, password: data.password });
          })}
          className="flex flex-col gap-4"
        >
          <LoginInput
            register={register}
            registerType={"id"}
            errors={errors}
            type="text"
            placeholder="Enter your ID"
          />
          <LoginInput
            register={register}
            registerType={"password"}
            errors={errors}
            type="password"
            placeholder="Enter your Password"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
      <button
        className=" flex flex-col justify-center items-center border border-gray rounded w-full"
        onClick={() => {
          if (!discordLoading) {
            window.location.href = discordOAuthUrl.url;
          }
        }}
      >
        <img className="w-[48px]" src={discord_icon} alt="discord" />
        디스코드로 시작하기
      </button>
    </div>
  );
};

export default Login;
