import './style/globalStyle.css'
import { BrowserRouter } from "react-router-dom";
import Page from "../1_Page";
import Header from './ui/Header';

const App = () => {
  return (
    <BrowserRouter>
      <main className=" w-full border-amber-500 border-1 m-auto h-full flex-col justify-center items-center">
        <Header />
        <Page />
      </main>
    </BrowserRouter>
  );
};

export default App;
