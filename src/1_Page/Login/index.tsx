import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginInput from "../../4_Shared/hookForm/LoginInput";
import loginInputSchema from "../../4_Shared/hookForm/LoginInput/schema";
import useGetSignIn from "../../3_Entity/Account/useGetSignIn";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginInputSchema),
  });
  const [signInEvent] = useGetSignIn();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form
          onSubmit={handleSubmit((data) => {
            signInEvent({ id: data.id, password: data.password });
          })}
          className="flex flex-col gap-4"
        >
          <LoginInput register={register} registerType={"id"} errors={errors} />
          <LoginInput
            register={register}
            registerType={"password"}
            errors={errors}
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
