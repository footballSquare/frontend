import { create } from "zustand";

type Page = {
  page: string;
  setPage: (page: string) => void;
};

const usePageStore = create<Page>()((set) => ({
  page: "",
  setPage: (page: string) => set(() => ({ page: page })),
}));

export default usePageStore;
