import Welcome from "./Welcome";
import Main from "./Main";
import Team from "./Team";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import PAGE_URI from "../4_Shared/constant/pageUri";
import FreeMatch from "./FreeMatch";
import Profile from "./Profile";

const Page = () => {
  const [cookies] = useCookies(["accessToken"]);
  const hasAccessToken = !!cookies.accessToken; // accessToken 존재 여부 확인
  return (
    <div className="w-full flex justify-center bg-light-blue">
      <Routes>
        <Route
          path="/"
          element={
            hasAccessToken ? <Navigate to={PAGE_URI.MAIN} /> : <Welcome />
          }
        />
        <Route path={PAGE_URI.MAIN} element={<Main />} />
        <Route path={PAGE_URI.TEAMLIST} element={<Main />} />
        <Route path={`${PAGE_URI.TEAM}/:teamIdx`} element={<Main />} />
        <Route path={`${PAGE_URI.TEAM}/:teamIdx`} element={<Team />} />
        <Route
          path={`${PAGE_URI.COMMUNITY}/:communityIdx`}
          element={<Main />}
        />
        <Route path={PAGE_URI.RANKING} element={<Main />} />
        <Route path={`${PAGE_URI.PROFILE}/:userIdx`} element={<Profile />} />
        <Route path={PAGE_URI.FREEMATCH} element={<FreeMatch />} />
      </Routes>
    </div>
  );
};

export default Page;
