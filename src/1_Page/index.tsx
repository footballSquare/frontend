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
import ChampionshipEdit from "./ChampionshipEdit";
import SignUp from "./SignUp";
import TeamList from "./TeamList";
import OAuthHub from "./OAuthHub";
import PostEdit from "./PostEdit";
import PostDetail from "./PostDetail";
import ChatTesting from "./ChatTesting";
import Boards from "./Boards";
import Chat from "./Chat";

const Page = () => {
  const [isLogin] = useIsLogin(); // accessToken 존재 여부 확인
  return (
    <div className="w-full h-full bg-gray-900 flex justify-center overflow-auto">
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? <Welcome /> : <Welcome />
            // <Navigate to={PAGE_URI.Main} />
          }
        />

        <Route path={PAGE_URI.MAIN} element={<Main />} />
        <Route path={PAGE_URI.TEAMLIST} element={<TeamList />} />
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
        <Route
          path={`${PAGE_URI.CHAMPIONSHIPEDIT}/:mode/:communityIdx`}
          element={<ChampionshipEdit />}
        />
        <Route path={`${PAGE_URI.SIGNUP}`} element={<SignUp />} />
        <Route path={`${PAGE_URI.OAUTH}`} element={<OAuthHub />} />
        <Route path={`${PAGE_URI.POST}/:postId`} element={<PostDetail />} />
        <Route
          path={`${PAGE_URI.POST}/write/edit/:postId`}
          element={<PostEdit />}
        />
        <Route
          path={`${PAGE_URI.POST}/write/new/:category`}
          element={<PostEdit />}
        />
        <Route path={`${PAGE_URI.TOPICS}`} element={<Boards />} />
        <Route path="/test/chat" element={<ChatTesting />} />
        <Route path={`${PAGE_URI.CHAT}`} element={<Chat />} />
      </Routes>
    </div>
  );
};

export default Page;
