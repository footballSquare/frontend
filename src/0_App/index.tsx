import "./style/globalStyle.css";
import { BrowserRouter } from "react-router-dom";
import Page from "../1_Page";
import Nav from "./ui/Nav";
import Modals from "./ui/Modals";
import useLoadMyInfo from "./model/useLoadMyInfo";

const App = () => {
  useLoadMyInfo();
  return (
    <BrowserRouter>
      <main className=" w-full m-auto h-full justify-center items-center bg-light-blue">
        <Nav />
        <Page />
        <Modals />
      </main>
    </BrowserRouter>
  );
};

export default App;
