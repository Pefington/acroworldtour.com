import { createContext, useContext } from "react";

interface ILayoutContext {
  pageTitle: string;
  setPageTitle: Function;
  pageDescription: string;
  setPageDescription: Function;
  activeNav: string;
  setActiveNav: Function;
}

const LayoutContext = createContext<ILayoutContext>({
  pageTitle: "",
  setPageTitle: () => {},
  pageDescription: "",
  setPageDescription: () => {},
  activeNav: "",
  setActiveNav: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export default LayoutContext;
