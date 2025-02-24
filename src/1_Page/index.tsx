import WelcomePage from "./WelcomePage";
import { Routes, Route } from "react-router-dom";

const Page = () => {
  return (
    <div className=" w-full flex justify-center items-center">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </div>
  );
};

export default Page;
