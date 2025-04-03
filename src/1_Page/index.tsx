import Welcome from "./Welcome";
import Main from "./Main";
import Team from "./Team";
import { Routes, Route, Navigate } from "react-router-dom";
import PAGE_URI from "../4_Shared/constant/pageUri";
import FreeMatch from "./FreeMatch";
import Profile from "./Profile";
import Community from "./Community";
import CommunityManaging from "./CommunityManaging";
import Login from "./Login";
import Championship from "./Championship";
import { useIsLogin } from "../4_Shared/lib/useMyInfo";

const Page = () => {
  const [isLogin] = useIsLogin()// accessToken 존재 여부 확인
  return (
    <div className="w-full h-full flex justify-center">
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? <Navigate to={PAGE_URI.MAIN} /> : <Welcome />
          }
        />
        <Route path={PAGE_URI.MAIN} element={<Main />} />
        <Route path={PAGE_URI.TEAMLIST} element={<Main />} />
        <Route path={`${PAGE_URI.TEAM}/:teamIdx`} element={<Team />} />
        <Route
          path={`${PAGE_URI.COMMUNITY}/:communityIdx`}
          element={<Community />}
        />
        <Route
          path={`${PAGE_URI.COMMUNITYMANAGING}/:communityIdx`}
          element={<CommunityManaging />}
        />
        <Route path={PAGE_URI.RANKING} element={<Main />} />
        <Route path={`${PAGE_URI.PROFILE}/:userIdx`} element={<Profile />} />
        <Route path={PAGE_URI.FREEMATCH} element={<FreeMatch />} />
        <Route path={PAGE_URI.LOGIN} element={<Login />} />
        <Route
          path={`${PAGE_URI.CHAMPIONSHIP}/:championshipIdx`}
          element={<Championship />}
        />
      </Routes>
    </div>
  );
};

export default Page;
