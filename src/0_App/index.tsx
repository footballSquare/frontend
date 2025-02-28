import "./style/globalStyle.css";
import { BrowserRouter } from "react-router-dom";
import Page from "../1_Page";
import Nav from "./ui/Nav";
import useMatchModalStore from "../4_Shared/zustand/useMatchModal";
import MatchModal from "../2_Widget/MatchModal";

const App = () => {
  const { isMatchModalOpen } = useMatchModalStore();
  return (
    <BrowserRouter>
      <main className=" w-full m-auto h-full justify-center items-center bg-light-blue">
        <Nav />
        <Page />
        {/* 매치 모달 */}
        {isMatchModalOpen && <MatchModal />}
      </main>
    </BrowserRouter>
  );
};

export default App;
