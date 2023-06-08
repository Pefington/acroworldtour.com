import Head from "next/head";
import { ReactNode, useState } from "react";

import LayoutContext from "./layoutContext";
import Nav from "./nav";

interface LayoutProps {
  children: ReactNode;
  fontClass: string;
}

const Layout = ({ children, fontClass }: LayoutProps) => {
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [activeNav, setActiveNav] = useState("");

  return (
    <LayoutContext.Provider
      value={{
        pageTitle,
        pageDescription,
        activeNav,
        setPageTitle,
        setPageDescription,
        setActiveNav,
      }}
    >
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <Nav fontClass={fontClass} activeNav={activeNav} />
      {children}
    </LayoutContext.Provider>
  );
};

export default Layout;
