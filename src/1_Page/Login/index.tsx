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
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      {/* 로그인 패널 */}
      <div className="w-full max-w-sm">
        {/* Glass Card */}
        <div className=" bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-lg font-bold text-white inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl mb-3 shadow-lg">
              FS
            </span>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-gray-300 text-sm">
              Sign in to your Football Square account
            </p>
          </div>
          {/* Login Form */}
          <form
            onSubmit={handleSubmit((data) => {
              postSignIn({ id: data.id, password: data.password });
            })}
            className="space-y-4"
          >
            {/* ID Input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-200">ID</label>
              <div>
                <input
                  type="text"
                  id="id"
                  {...register("id")}
                  className={`w-full px-3 py-2.5 bg-gray-800/50 border ${
                    errors.id ? "border-red-400" : "border-gray-600"
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm`}
                  placeholder="Enter your ID"
                />
                {errors.id && (
                  <p className="text-red-400 text-xs">{errors.id.message}</p>
                )}
              </div>
            </div>
            {/* Password Input */}
            <div className="space-y-1 pt-1">
              <label className="text-sm font-medium text-gray-200">
                Password
              </label>
              <div>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className={`w-full px-3 py-2.5 bg-gray-800/50 border ${
                    errors.password ? "border-red-400" : "border-gray-600"
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-transparent hover:from-gray-500 hover:to-gray-700 text-sm"
            >
              Sign In
            </button>
            {/* Sign Up Button */}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full py-2.5 bg-gray-700/50 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-600/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
            >
              Create Account
            </button>
          </form>
          {/* Forgot Password Link */}
          <button
            onClick={toggleIsFindLoginInfoModalOpen}
            className="block mx-auto mt-2 text-gray-400 hover:text-gray-200 text-xs transition-colors duration-200"
          >
            Forgot your login information?
          </button>
          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-3 text-gray-400 text-xs">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>
          {/* Discord Login */}
          <button
            onClick={() => {
              if (!discordLoading) {
                window.location.href = discordOAuthUrl.url;
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-transparent text-sm"
          >
            <img className="w-5 h-5" src={discord_icon} alt="Discord" />
            <span>Continue with Discord</span>
          </button>
        </div>
        {/* Footer */}
        <p className="w-fit text-gray-400 text-xs mt-4 mx-auto">
          Join the ultimate football community experience
        </p>
      </div>
      {/* 아이디/비밀번호 찾기 Modal */}
      {isFindLoginInfoModalOpen && (
        <FindLoginInfoModal
          toggleModalHandler={toggleIsFindLoginInfoModalOpen}
        />
      )}
    </div>
  );
};

export default Login;
