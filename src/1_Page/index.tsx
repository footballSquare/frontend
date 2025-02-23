import Main from "./Main";
import { Routes, Route } from "react-router-dom";

const Page = () => {
  return (
    <div className=" w-full flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
};

export default Page;
