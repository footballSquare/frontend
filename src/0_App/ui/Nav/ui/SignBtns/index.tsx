import { useNavigate } from "react-router-dom";
import { useIsLogin, useLogout } from "../../../../../4_Shared/lib/useMyInfo";
import PAGE_URI from "../../../../../4_Shared/constant/pageUri";
import Button from "../../../../../4_Shared/components/Button";

const SignBtns = () => {
  const navigate = useNavigate();
  const [isLogin] = useIsLogin();
  const [logout] = useLogout();
  return (
    <div className="sm:flex lg:text-base lg:max-w-[206px] max-w-[168px] text-xs gap-4 w-full">
      {!isLogin ? (
        <Button
          text={"Login"}
          textColor="white"
          onClickHandler={() => {
            navigate(PAGE_URI.LOGIN);
          }}
        />
      ) : (
        <Button
          textColor="white"
          text={"Logout"}
          onClickHandler={logout}
        />
      )}
    </div>
  );
};

export default SignBtns;
