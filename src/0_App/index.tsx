import "./style/globalStyle.css";
import { BrowserRouter } from "react-router-dom";
import Page from "../1_Page";
import Nav from "./ui/Nav";
import Modals from "./ui/Modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const App = () => {
  const clientQuery = new QueryClient();
  return (
    <QueryClientProvider client={clientQuery}>
      <BrowserRouter>
        <main className="mt-[80px] w-full h-full justify-center items-center">
          <Nav />
          <Page />
          <Modals />
        </main>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
