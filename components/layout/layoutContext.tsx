import { createContext, useContext } from "react";

interface ILayoutContext {
  pageTitle: string;
  pageDescription: string;
  activeNav: string;
  setPageTitle: Function;
  setPageDescription: Function;
  setActiveNav: Function;
}

const LayoutContext = createContext<ILayoutContext>({
  pageTitle: "",
  pageDescription: "",
  activeNav: "",
  setPageTitle: () => {},
  setPageDescription: () => {},
  setActiveNav: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export default LayoutContext;
