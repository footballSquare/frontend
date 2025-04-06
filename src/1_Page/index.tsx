import Welcome from "./Welcome";
import Main from "./Main";
import Team from "./Team";
import { Routes, Route } from "react-router-dom";
import PAGE_URI from "../4_Shared/constant/pageUri";
import FreeMatch from "./FreeMatch";
import Profile from "./Profile";
import Community from "./Community";
import Login from "./Login";
import Championship from "./Championship";
import { useIsLogin } from "../4_Shared/lib/useMyInfo";

const TEST = import.meta.env.VITE_TEST;

const Page = () => {
  console.log(TEST);
  const [isLogin] = useIsLogin(); // accessToken 존재 여부 확인
  return (
    <div className="w-full h-full flex justify-center">
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? <Welcome /> : <Welcome />
            // <Navigate to={PAGE_URI.Main} />
          }
        />

        <Route path={PAGE_URI.MAIN} element={<Main />} />
        <Route path={PAGE_URI.TEAMLIST} element={<Main />} />
        <Route path={`${PAGE_URI.TEAM}/:teamIdx`} element={<Team />} />
        <Route
          path={`${PAGE_URI.COMMUNITY}/:communityIdx`}
          element={<Community />}
        />
        <Route path={PAGE_URI.RANKING} element={<Main />} />
        <Route path={`${PAGE_URI.PROFILE}/:userIdx`} element={<Profile />} />
        <Route path={PAGE_URI.FREEMATCH} element={<FreeMatch />} />
        <Route path={PAGE_URI.LOGIN} element={<Login />} />
        <Route
          path={`${PAGE_URI.CHAMPIONSHIP}/:championshipIdx`}
          element={<Championship />}
        />
        <Route path={PAGE_URI.CHAMPIONSHIPEDIT} element={<Championship />} />
      </Routes>
    </div>
  );
};

export default Page;
