import './style/globalStyle.css'
import { BrowserRouter } from "react-router-dom";
import Page from "../1_Page";
import Nav from './ui/Nav';

const App = () => {
  return (
    <BrowserRouter>
      <main className=" w-full m-auto h-full justify-center items-center bg-light-blue">
        <Nav />
        <Page />
      </main>
    </BrowserRouter>
  );
};

export default App;
