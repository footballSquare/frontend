import './style/globalStyle.css'
import { BrowserRouter } from "react-router-dom";
import Page from "../1_Page";
import Nav from './ui/Nav';

const App = () => {
  return (
    <BrowserRouter>
      <main className=" w-full m-auto h-full flex-col justify-center items-center">
        <Nav />
        <Page />
      </main>
    </BrowserRouter>
  );
};

export default App;
