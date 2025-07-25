import "./style/globalStyle.css";
import { BrowserRouter } from "react-router-dom";
import Page from "../1_Page";
import Nav from "./ui/Nav";
import Modals from "./ui/Modals";

const App = () => {
  return (
    <BrowserRouter>
      <main className="mt-[80px] w-full h-full justify-center items-center">
        <Nav />
        <Page />
        <Modals />
      </main>
    </BrowserRouter>
  );
};

export default App;


